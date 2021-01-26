//Переменные
let overlay = document.querySelector('.overlay');
let openEditButton = document.querySelector('.profile__editButton');
let closeEditButton = overlay.querySelector('.popup__closeButton');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
let formElement = overlay.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__input_value_name');
let jobInput = formElement.querySelector('.popup__input_value_job');

//Функция открытия popup с внесение данных в форму
function openpopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    overlay.classList.add('overlay_active')
}

//Функция закрытия popup без сохранения данных
function closepopup() {
    overlay.classList.remove('overlay_active')
}

//Функция закрытия popup с сохранением данных
function formSubmitHandler (evt) {
    evt.preventDefault(); 

    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;

    closepopup();
}


//слушатели
openEditButton.addEventListener('click', openpopup);
closeEditButton.addEventListener('click', closepopup);
formElement.addEventListener('submit', formSubmitHandler);
/*


function togglepopup() {
    overlay.classList.toggle('overlay_active')
}

openEditButton.addEventListener('click', togglepopup);
closeEditButton.addEventListener('click', togglepopup);

let formElement = overlay.querySelector('.popup__form');
let nameInput = formElement.querySelector('.popup__nameInput');
let jobInput = formElement.querySelector('.popup__jobInput');




*/