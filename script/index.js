
import { initialCards } from './cards.js';
import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

//Переменные
const overlayEdit = document.querySelector('.overlay_type_edit'); // секция попапа редактирования
const openEditButton = document.querySelector('.profile__editButton'); // кнопка открытия попапа редактирования
const profileTitle = document.querySelector('.profile__title'); // текущее имя для попапа редактирования
const profileSubtitle = document.querySelector('.profile__subtitle'); // текущая работа для попапа редактирования
const formEditPopup = overlayEdit.querySelector('.popup__form'); // форма попапа редактирования
const nameInput = formEditPopup.querySelector('.popup__input_value_name'); // поле имя в форме попапа редактирования
const jobInput = formEditPopup.querySelector('.popup__input_value_job'); // поле работа в форме попапа редактирования
const overlayAddPlace = document.querySelector('.overlay_type_addPlace'); // секция попапа добавления места
const openAddButton = document.querySelector('.profile__addButton'); // кнопка открытия попапа добавления места
const formAddPopup = overlayAddPlace.querySelector('.popup__form'); // форма попапа добавления места
const namePlace = formAddPopup.querySelector('.popup__input_value_namePlace'); // поле имя в форме добавления места
const imgPlace = formAddPopup.querySelector('.popup__input_value_imgPlace'); // поле картинка в форме добавления места
const elementsBox = document.querySelector('.elements'); //общий контейнер для мест, сюда добавляем места
const popups = document.querySelectorAll('.overlay')//массив всех popup с overlay на странице
export const overlayPictureBox = document.querySelector('.overlay_type_image'); // секция попапа большой картинки
export const overlayPicture = overlayPictureBox.querySelector('.popup__piture'); // картинка попапа большой картинки
export const overlayPictureName = overlayPictureBox.querySelector('.popup__pitureName'); // подпись попапа большой картинки

//добавляем обработчик клика всем popup с overlay на странице и закрываем если кликают по крестику или overlay_active
popups.forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target.classList.contains('overlay_active')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__closeButton')) {
          closePopup(popup)
        }
    })
})

//Функция внесения данных в форму перед открытием попапа редактирования
function addValuePopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(overlayEdit);
}

//Функция открытия popup
export function openPopup(type) {
    type.classList.add('overlay_active');
    document.addEventListener('keydown', closePopupByEsc);
}

//Функция закрытия popup без сохранения данных
function closePopup(type) {
    type.classList.remove('overlay_active');
    document.removeEventListener('keydown', closePopupByEsc);
}

//Функция закрытия popup редактирования с сохранением данных
function changeFormEdit () {
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    ValidEditPopup.disableSubmitButton();//публичный метод модуля FormValidator для выключения кнопки
    closePopup(overlayEdit);
}

//функция добавления карточки места с помощью класса Card
function addPlace(item) {
    const card = new Card(item, '.elements__articleTemplate');
	const cardElement = card.generateCard();
	elementsBox.prepend(cardElement);
};

//Функция закрытия popup c создание нового места
function createPlace (evt) {
    const _newCardElement = {
        name: namePlace.value,
        link: imgPlace.value
        }
    addPlace(_newCardElement);
    formAddPopup.reset();
    ValidAddPopup.disableSubmitButton();//публичный метод модуля FormValidator для выключения кнопки
    closePopup(overlayAddPlace);
}

//функция закрытия popup по кнопке Esc
function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.overlay_active')
        closePopup(openedPopup);
    }
}

//создаем карточки при помощи класса card
//проходим по массиву с карточками и вызываем функцию addPlace для каждого эдемента
initialCards.forEach((item) => {
    addPlace(item);
});


// объект настроек формы
const formSetting = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__saveButton',
    inactiveButtonClass: 'popup__saveButton_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };
  
//создаем объекты валидации для каждой формы
const ValidAddPopup = new FormValidator(formSetting, formAddPopup);
ValidAddPopup.enableValidation();

const ValidEditPopup = new FormValidator(formSetting, formEditPopup);
ValidEditPopup.enableValidation();


//слушатели
openAddButton.addEventListener("click", () => openPopup(overlayAddPlace));
openEditButton.addEventListener("click", () => addValuePopup());
formEditPopup.addEventListener('submit', changeFormEdit);
formAddPopup.addEventListener('submit', createPlace);
