document.addEventListener("DOMContentLoaded", () => {
    // Setup filter sliders and checkboxes
    initializeFilters();

    // Event listener for filter toggle visibility
    setupFilterToggle();

    // Event listener for clearing all filters
    document.getElementById('clearFilters').addEventListener('click', () => {
        resetFilters();
        applyFilters();
    });

    // Event delegation for member and country checkboxes
    document.getElementById('filterOptions').addEventListener('change', (event) => {
        if (event.target.matches('#memberCheckboxes input, #countryCheckboxes input')) {
            applyFilters();
        }
    });

    // Initial filter application
    applyFilters();
});

function initializeFilters() {
    const artistCards = Array.from(document.querySelectorAll('.artist-card'));

    setupRangeSliders('creationDate', getRangeValues(artistCards, 1));
    setupRangeSliders('firstAlbumDate', getRangeValues(artistCards, 2, date => parseInt(date.split('-')[2])));

    populateCheckboxes(
        'memberCheckboxes',
        getUniqueValues(artistCards, 3, parseInt),
        'member'
    );

    populateCheckboxes(
        'countryCheckboxes',
        getUniqueCountries(artistCards),
        'country'
    );
}

function setupRangeSliders(id, { min, max }) {
    const [minSlider, maxSlider, minValue, maxValue] = [
        document.getElementById(`${id}Min`),
        document.getElementById(`${id}Max`),
        document.getElementById(`${id}MinValue`),
        document.getElementById(`${id}MaxValue`),
    ];

    [minSlider, maxSlider].forEach(slider => {
        slider.min = min;
        slider.max = max;
        slider.value = slider === minSlider ? min : max;
    });

    [minValue.textContent, maxValue.textContent] = [min, max];

    [minSlider, maxSlider].forEach(slider => {
        slider.addEventListener('input', () => updateSliderValues(minSlider, maxSlider, minValue, maxValue));
    });
}

function updateSliderValues(minSlider, maxSlider, minValue, maxValue) {
    if (parseInt(minSlider.value) > parseInt(maxSlider.value)) {
        minSlider.value = maxSlider.value;
    }

    [minValue.textContent, maxValue.textContent] = [minSlider.value, maxSlider.value];
    applyFilters();
}

function getRangeValues(cards, index, transformFn = parseInt) {
    const values = cards.map(card =>
        transformFn(card.querySelector(`.artist-info p:nth-child(${index}) strong`).textContent)
    );
    return { min: Math.min(...values), max: Math.max(...values) };
}

function getUniqueValues(cards, index, transformFn) {
    return Array.from(
        new Set(
            cards.map(card =>
                transformFn(card.querySelector(`.artist-info p:nth-child(${index}) strong`).textContent)
            )
        )
    ).sort((a, b) => a - b);
}

function getUniqueCountries(cards) {
    const countries = new Set();
    cards.forEach(card => {
        Array.from(card.querySelectorAll('.card-locations ul li')).forEach(location => {
            const country = location.textContent.split(', ').pop().trim();
            if (country) countries.add(country);
        });
    });
    return Array.from(countries).sort();
}

function populateCheckboxes(containerId, values, prefix) {
    const container = document.getElementById(containerId);
    values.forEach(value => {
        const div = document.createElement('div');
        div.innerHTML = `
            <input type="checkbox" id="${prefix}-${value}" value="${value}">
            <label for="${prefix}-${value}">${value}</label>
        `;
        container.appendChild(div);
    });
}

function setupFilterToggle() {
    const toggleBtn = document.getElementById('filterToggleBtn');
    const filterOptions = document.getElementById('filterOptions');

    toggleBtn.addEventListener('click', () => {
        filterOptions.style.display = filterOptions.style.display === 'none' ? 'block' : 'none';
    });

    document.addEventListener('click', event => {
        if (!filterOptions.contains(event.target) && event.target !== toggleBtn) {
            filterOptions.style.display = 'none';
        }
    });
}

function resetFilters() {
    ['creationDate', 'firstAlbumDate'].forEach(id => {
        const minSlider = document.getElementById(`${id}Min`);
        const maxSlider = document.getElementById(`${id}Max`);
        minSlider.value = minSlider.min;
        maxSlider.value = maxSlider.max;
        document.getElementById(`${id}MinValue`).textContent = minSlider.min;
        document.getElementById(`${id}MaxValue`).textContent = maxSlider.max;
    });

    document.querySelectorAll('#filterOptions input[type="checkbox"]').forEach(cb => (cb.checked = false));
}

function applyFilters() {
    const filters = {
        creationDate: getRangeValuesFromSlider('creationDate'),
        firstAlbumDate: getRangeValuesFromSlider('firstAlbumDate'),
        members: getCheckedValues('memberCheckboxes'),
        countries: getCheckedValues('countryCheckboxes').map(v => v.toLowerCase()),
    };

    document.querySelectorAll('.artist-card').forEach(card => {
        const data = {
            creationDate: parseInt(card.querySelector('.artist-info p:nth-child(1) strong').textContent),
            firstAlbumDate: parseInt(card.querySelector('.artist-info p:nth-child(2) strong').textContent.split('-')[2]),
            members: parseInt(card.querySelector('.artist-info p:nth-child(3) strong').textContent),
            countries: Array.from(card.querySelectorAll('.card-locations ul li')).map(li =>
                li.textContent.split(', ').pop().trim().toLowerCase()
            ),
        };

        const matches = [
            data.creationDate >= filters.creationDate.min && data.creationDate <= filters.creationDate.max,
            data.firstAlbumDate >= filters.firstAlbumDate.min && data.firstAlbumDate <= filters.firstAlbumDate.max,
            !filters.members.length || filters.members.includes(data.members),
            !filters.countries.length || data.countries.some(c => filters.countries.includes(c)),
        ];

        card.style.display = matches.every(Boolean) ? 'block' : 'none';
    });
}

function getRangeValuesFromSlider(id) {
    return {
        min: parseInt(document.getElementById(`${id}Min`).value),
        max: parseInt(document.getElementById(`${id}Max`).value),
    };
}

function getCheckedValues(containerId) {
    return Array.from(document.querySelectorAll(`#${containerId} input[type="checkbox"]:checked`)).map(cb => cb.value);
}
