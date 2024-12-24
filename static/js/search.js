let debounceTimer;
let searchInput, searchSuggestions;

document.addEventListener("DOMContentLoaded", () => {
    searchInput = document.getElementById('searchInput');
    searchSuggestions = document.getElementById('searchSuggestions');
    searchInput.addEventListener('input', debounceSearch);

    // Use event delegation for document clicks
    document.body.addEventListener('click', (event) => {
        if (event.target !== searchInput && !searchSuggestions.contains(event.target)) {
            searchSuggestions.innerHTML = '';
        }
    });
});

function debounceSearch() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        if (searchInput.value.length >= 3) {
            searchArtists();
        } else {
            searchSuggestions.innerHTML = '';
            document.querySelectorAll('.artist-card').forEach(card => card.style.display = "");
        }
    }, 300);
}

function searchArtists() {
    searchInput = document.getElementById('searchInput');
    searchSuggestions = document.getElementById('searchSuggestions');
    const filter = searchInput.value.toLowerCase();
    const artistCards = document.querySelectorAll('.artist-card');

    // Clear previous suggestions
    searchSuggestions.innerHTML = '';

    if (filter.length < 3) {
        artistCards.forEach(card => card.style.display = "");
        return;
    }

    let suggestions = [];

    artistCards.forEach(card => {
        const artistName = card.getAttribute('data-artist-name').toLowerCase();
        const creationDate = card.querySelector('.artist-info p:nth-child(1) strong').textContent.toLowerCase();
        const firstAlbum = card.querySelector('.artist-info p:nth-child(2) strong').textContent.toLowerCase();
        const members = Array.from(card.querySelectorAll('.card-members li')).map(li => li.textContent.toLowerCase());
        const locations = Array.from(card.querySelectorAll('.card-locations li')).map(li => li.textContent.toLowerCase());
        const dates = Array.from(card.querySelectorAll('.card-dates li')).map(li => li.textContent.toLowerCase());

        let matchFound = false;

        if (artistName.includes(filter)) {
            suggestions.push({ text: card.getAttribute('data-artist-name'), type: 'artist/band' });
            matchFound = true;
        }

        if (creationDate.includes(filter)) {
            suggestions.push({ text: `${card.getAttribute('data-artist-name')} (${creationDate})`, type: 'creation date' });
            matchFound = true;
        }

        if (firstAlbum.includes(filter)) {
            suggestions.push({ text: `${card.getAttribute('data-artist-name')} - ${firstAlbum}`, type: 'first album date' });
            matchFound = true;
        }

        members.forEach(member => {
            if (member.includes(filter)) {
                suggestions.push({ text: `${member} (${card.getAttribute('data-artist-name')})`, type: 'member' });
                matchFound = true;
            }
        });

        locations.forEach(location => {
            if (location.toLowerCase().includes(filter)) {
                suggestions.push({ text: `${location} (${card.getAttribute('data-artist-name')})`, type: 'location' });
                matchFound = true;
            }
        });

        dates.forEach(date => {
            if (date.toLowerCase().includes(filter)) {
                suggestions.push({ text: `${date} (${card.getAttribute('data-artist-name')})`, type: 'date' });
                matchFound = true;
            }
        });

        card.style.display = matchFound ? "" : "none";
    });

    // Display suggestions
    suggestions.slice(0, 5).forEach(suggestion => {
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'suggestion';
        suggestionElement.innerHTML = `<span class="suggestion-text">${suggestion.text}</span> <span class="suggestion-type">${suggestion.type}</span>`;
        suggestionElement.addEventListener('click', () => {
            searchInput.value = suggestion.text.split(' (')[0]; // Set only the main part of the suggestion
            searchArtists();
            searchSuggestions.innerHTML = ''; // Clear suggestions after clicking
        });
        searchSuggestions.appendChild(suggestionElement);
    });
}

// Add this event listener to hide suggestions when clicking outside
document.addEventListener('click', function (event) {
    searchSuggestions = document.getElementById('searchSuggestions');
    searchInput = document.getElementById('searchInput');
    if (event.target !== searchInput && event.target !== searchSuggestions) {
        searchSuggestions.innerHTML = '';
    }
});

// Prevent the click on suggestions from bubbling up to the document
document.getElementById('searchSuggestions').addEventListener('click', function (event) {
    event.stopPropagation();
});