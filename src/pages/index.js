import './index.css';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { initialCards } from '../components/cards.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';

//Переменные
const overlayEdit = document.querySelector('.overlay_type_edit'); // секция попапа редактирования
const openEditButton = document.querySelector('.profile__editButton'); // кнопка открытия попапа редактирования
const formEditPopup = overlayEdit.querySelector('.popup__form'); // форма попапа редактирования
const nameInput = formEditPopup.querySelector('.popup__input_value_name'); // поле имя в форме попапа редактирования
const jobInput = formEditPopup.querySelector('.popup__input_value_job'); // поле работа в форме попапа редактирования
const overlayAddPlace = document.querySelector('.overlay_type_addPlace'); // секция попапа добавления места
const openAddButton = document.querySelector('.profile__addButton'); // кнопка открытия попапа добавления места
const formAddPopup = overlayAddPlace.querySelector('.popup__form'); // форма попапа добавления места
const elementsBox = document.querySelector('.elements'); //общий контейнер для мест, сюда добавляем места

//создаем первоначальные 6 карточек
const DefaultCards = new Section ({ 
    items: initialCards,
    renderer: (item) => {
        const card = new Card(item, '.elements__articleTemplate', {
            handleCardClick: () => {
                const itemPopupWithImage = new PopupWithImage('.overlay_type_image');
                itemPopupWithImage.open(item.link, item.name);
                itemPopupWithImage.setEventListeners()
              }
        });
        const cardElement = card.generateCard();
        elementsBox.prepend(cardElement);
        } 
}, '.elements');
DefaultCards.renderItems();

// подключаем валидатор
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

//создаем форму добавления новой карточки
const CardAddPopup = new PopupWithForm ('.overlay_type_addPlace', {
    FormSubmit: () => {
        const newCardData = {
            name: overlayAddPlace.querySelector('.popup__input_value_namePlace').value,
            link: overlayAddPlace.querySelector('.popup__input_value_imgPlace').value
          };
        const newCard = new Card(newCardData, '.elements__articleTemplate', {
            handleCardClick: () => {
                const itemPopupWithImage = new PopupWithImage('.overlay_type_image');
                itemPopupWithImage.open(newCardData.link, newCardData.name);
                itemPopupWithImage.setEventListeners()
              }
        });
        const newCardElement = newCard.generateCard();
        DefaultCards.addItem(newCardElement);
        ValidAddPopup.disableSubmitButton();
        CardAddPopup.close();
      }
});
CardAddPopup.setEventListeners();

//создание экземпляра класса UserInfo
const userData = new UserInfo({
    userNameSelector: '.profile__title',
    userProfessionSelector: '.profile__subtitle'
});

//создаем попап редактирования передаем классу PopupWithForm селектор формы и функцию-способ обработки закрытия
const EditPopup = new PopupWithForm('.overlay_type_edit', {
    FormSubmit: () => {
        userData.setUserInfo(nameInput.value, jobInput.value);
        EditPopup.close();
    }
});
EditPopup.setEventListeners();

//открытие формы с внесением в нее данных
function EditPopupOpen() {
    const actualUserData = userData.getUserInfo();
    nameInput.value = actualUserData.userName;
    jobInput.value = actualUserData.userProfession;
    ValidEditPopup.disableSubmitButton();
    EditPopup.open();
}

//слушатели
openAddButton.addEventListener("click", () => CardAddPopup.open());
openEditButton.addEventListener("click", () => EditPopupOpen());