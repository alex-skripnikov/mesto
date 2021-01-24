let overlay = document.querySelector('.overlay');
let openEditButton = document.querySelector('.profile__editButton');
let closeEditButton = overlay.querySelector('.popup__closeButton');

function togglepopup() {
    overlay.classList.toggle('overlay_active')
}

openEditButton.addEventListener('click', togglepopup);
closeEditButton.addEventListener('click', togglepopup);

let formElement = overlay.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__nameInput');
let jobInput = formElement.querySelector('.popup__jobInput');

function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    let profileTitle = document.querySelector('.profile__title');
    let profileSubtitle = document.querySelector('.profile__subtitle');

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    togglepopup();
}

formElement.addEventListener('submit', formSubmitHandler);