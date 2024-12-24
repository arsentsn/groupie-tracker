const cardStates = new Map();
const CardState = {
    FRONT: 0,
    MEMBERS: 1,
    LOCATIONS: 2,
    DATES: 3,
    RELATIONS: 4
};

document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".artist-card");
    cards.forEach(card => initializeCard(card));
});

function initializeCard(card) {
    // Set initial state
    cardStates.set(card, CardState.FRONT);

    // Cache card elements
    const cardInner = card.querySelector(".card-inner");
    const front = card.querySelector(".card-front");
    const progressBar = createProgressBar(card);

    // Set initial styles
    resetCard(card);

    // Add event listeners
    card.addEventListener("click", () => flipCard(card));
    const mapButton = card.querySelector(".map-button");
    if (mapButton) {
        mapButton.addEventListener("click", event => event.stopPropagation());
    }
}

function createProgressBar(card) {
    const progressBar = document.createElement('div');
    progressBar.classList.add('card-progress');
    card.appendChild(progressBar);
    return progressBar;
}

function flipCard(card) {
    const artistName = card.getAttribute('data-artist-name');
    const currentState = cardStates.get(card);
    const nextState = (currentState + 1) % Object.keys(CardState).length;
    cardStates.set(card, nextState);

    console.log(`Flipping ${artistName}'s card to: ${Object.keys(CardState)[nextState]}`);
    updateCardState(card, nextState);
}

function updateCardState(card, state) {
    const cardInner = card.querySelector(".card-inner");
    const faces = {
        front: card.querySelector(".card-front"),
        members: card.querySelector(".card-members"),
        locations: card.querySelector(".card-locations"),
        dates: card.querySelector(".card-dates"),
        relations: card.querySelector(".card-relations")
    };
    const progressBar = card.querySelector('.card-progress');

    // Reset all faces
    Object.values(faces).forEach(face => {
        face.style.opacity = "0";
        face.style.zIndex = "1";
    });

    // Apply state-specific updates
    switch (state) {
        case CardState.FRONT:
            cardInner.style.transform = "rotateY(0deg)";
            faces.front.style.opacity = "1";
            faces.front.style.zIndex = "5";
            progressBar.style.width = "0";
            break;
        case CardState.MEMBERS:
            cardInner.style.transform = "rotateY(180deg)";
            updateFace(faces.members, progressBar, "25%", "Artist", "Members");
            break;
        case CardState.LOCATIONS:
            cardInner.style.transform = "rotateY(360deg)";
            updateFace(faces.locations, progressBar, "50%", "Location", "Locations");
            break;
        case CardState.DATES:
            cardInner.style.transform = "rotateY(540deg)";
            updateFace(faces.dates, progressBar, "75%", "Date", "Dates");
            break;
        case CardState.RELATIONS:
            cardInner.style.transform = "rotateY(720deg)";
            updateFace(faces.relations, progressBar, "98%", "Relation", "Relations");
            break;
    }
}

function updateFace(face, progressBar, width, singularTitle, pluralTitle) {
    face.style.opacity = "1";
    face.style.zIndex = "5";
    progressBar.style.width = width;

    const title = face.querySelector('.category-title');
    const items = face.querySelectorAll('li');
    if (title) {
        title.textContent = items.length === 1 ? singularTitle : pluralTitle;
    }
}

function resetCard(card) {
    cardStates.set(card, CardState.FRONT);
    updateCardState(card, CardState.FRONT);
}

function flipAllCards() {
    document.querySelectorAll(".artist-card").forEach(card => flipCard(card));
}

function resetAllCards() {
    document.querySelectorAll(".artist-card").forEach(card => resetCard(card));
}

document.addEventListener('keydown', event => {
    if (event.key.toLowerCase() === 'f' && !isInputFocused(event)) {
        flipAllCards();
    } else if (event.key.toLowerCase() === 'r' && !isInputFocused(event)) {
        resetAllCards();
    }
});

function isInputFocused(event) {
    const tagName = event.target.tagName;
    return tagName === 'INPUT' || tagName === 'TEXTAREA' || event.target.getAttribute('contenteditable') === 'true';
}