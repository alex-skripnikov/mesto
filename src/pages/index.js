import './index.css';
import { Section } from '../components/Section.js';
import { Popup } from '../components/Popup.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api.js';

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
const newsAvatarPopup = document.querySelector('.overlay_type_setAvatar'); // форма попапа редактирования аватара
const popupDeleteButton = document.querySelector('.popup__deleteCardButton');

//создание экземпляра класса UserInfo
const userData = new UserInfo({
    userNameSelector: '.profile__title',
    userProfessionSelector: '.profile__subtitle',
    userAvatarSelector: '.profile__avatar'
});

//создание экземпляра popup с функционалом popupDelete
const popupDelete = new Popup('.overlay_type_deletePlace');
popupDelete.setEventListeners();
//

function deleteCard() {
    api.deletecard(idDelCard)
    .then(data => {
        renderLoading(popupDelete, true);
        DelElement.remove();
        popupDeleteButton.removeEventListener('click', deleteCard);
        popupDelete.close();        
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
        renderLoading(popupDelete, false);
    });
}

//переменная для хранения Id карточки которая будет удаляться
let idDelCard = '';
//переменная для хранения элемента который будет удаляться
let DelElement = '';
//функция удаления карточки с сервера и со страницы
function deleteCardOfSevere(itemcardId, itemcard) {
    idDelCard = itemcardId;
    DelElement = itemcard;
    popupDelete.open();
    popupDeleteButton.addEventListener('click', deleteCard);
}


//создаем попап с изображением
const itemPopupWithImage = new PopupWithImage('.overlay_type_image');
itemPopupWithImage.setEventListeners();

//функция создания карточки возвращает элемент карточки
function createCard(item) {
    const card = new Card(item, '.elements__articleTemplate', {
        handleCardClick: () => {
            itemPopupWithImage.open(item.link, item.name);
          }
    }, userId);
    const itemcard = card.generateCard();
    if (userId === item.owner._id) {
        itemcard.querySelector('.element__deleteButton').addEventListener('click', () => { deleteCardOfSevere(item._id, itemcard); });
    }
    else {itemcard.querySelector('.element__deleteButton').remove()}
    return itemcard;
  }

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

const ValidNewAvatarPopup = new FormValidator(formSetting, newsAvatarPopup);
ValidNewAvatarPopup.enableValidation();


//определяем базовые настройки Api запросов и создаем экземпляр класса Api
const options = {
    baseurl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: '2fa4574e-067b-43c1-ad9a-ac01ea748456',
        'Content-Type': 'application/json',
    },
}
export const api = new Api(options);

//создаем переменную userId
let userId;
//вызываем метод getUserInfo - get запрос на получение информации о пользователе, после выводим имя, профессию и аватар на страницу
api.getUserInfo()
.then(data => {
    userId = data._id;
    userData.setUserInfo(data.name, data.about);
    userData.setAvatar(data.avatar);
})
.catch((err) => {
    console.log(err); // выведем ошибку в консоль
});

//создаем создаем экземпляр класса DefaultCards чтобы было куда добавлять карточки
const DefaultCards = new Section ({ 
    items: [],
    renderer: (item) => {
        elementsBox.prepend(createCard(item));
        } 
}, '.elements');

//получаем с сервера массив с карточками и каждую добавляем на страницу
api.getInitialCards()
.then(data => {
    data.forEach(item => DefaultCards.addItem(createCard(item)));
})
.catch((err) => {
    console.log(err); // выведем ошибку в консоль
});

//создаем попап редактирования передаем классу PopupWithForm селектор формы и функцию-способ обработки закрытия
const EditPopup = new PopupWithForm('.overlay_type_edit', {
    FormSubmit: () => {
        renderLoading(EditPopup, true);
        //редактируем данные о пользователе на сервере и на странице
        api.setUserInfoOnServer(nameInput.value, jobInput.value)
        .then(data => {
            userData.setUserInfo(data.name, data.about);
            EditPopup.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            renderLoading(EditPopup, false);
        }); 
    }
});
EditPopup.setEventListeners();

//создаем попап обновления аватара
const NewAvatarPopup = new PopupWithForm('.overlay_type_setAvatar', {
    FormSubmit: () => {
        renderLoading(NewAvatarPopup, true);
        const newAvatar = newsAvatarPopup.querySelector('.popup__input_value_newAvatar');
        api.setAvatar(newAvatar.value)
        .then(data => {
            userData.setAvatar(data.avatar);
            NewAvatarPopup.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            renderLoading(NewAvatarPopup, false);
        }); 
    }
});
NewAvatarPopup.setEventListeners();

//открытие формы с внесением в нее данных
function EditPopupOpen() {
    const actualUserData = userData.getUserInfo();
    nameInput.value = actualUserData.userName;
    jobInput.value = actualUserData.userProfession;
    ValidEditPopup.disableSubmitButton();
    EditPopup.open();
}

//создаем форму добавления новой карточки
const CardAddPopup = new PopupWithForm ('.overlay_type_addPlace', {
    FormSubmit: () => {
        renderLoading(CardAddPopup, true);
        const newCardData = {
            name: overlayAddPlace.querySelector('.popup__input_value_namePlace').value,
            link: overlayAddPlace.querySelector('.popup__input_value_imgPlace').value
          };
        api.setNewCardOnServer(newCardData)
        .then(data => {
            DefaultCards.addItem(createCard(data));
            ValidAddPopup.disableSubmitButton();
            CardAddPopup.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            renderLoading(CardAddPopup, false);
        }); 
      }
});
CardAddPopup.setEventListeners();

let oldButtonName = '';
//функция отображжения слова "Сохранение..." в формах
function renderLoading(popupName, isLoading) {
    const newButtonName = popupName._popupElement.querySelector('.popup__saveButton');
    if(isLoading) {
        oldButtonName = newButtonName.textContent;
        newButtonName.textContent = 'Сохранение...';
    } else {
        newButtonName.textContent = oldButtonName;
    }
  }

//слушатели
openAddButton.addEventListener("click", () => CardAddPopup.open());
openEditButton.addEventListener("click", () => EditPopupOpen());
document.querySelector('.profile__avatarBox').addEventListener("click", () => NewAvatarPopup.open());