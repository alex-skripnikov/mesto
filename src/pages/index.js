import './index.css';
import { Section } from '../components/Section.js';
import { PopupDeleteCard } from '../components/PopupDeleteCard.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Api } from '../components/Api.js';
import { formSetting, options, renderLoading, oldButtonName, dataUser, overlaySelectors, cardSchablonSelector, cardBoxSelector, } from '../utils/constants.js';


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
const nameInputElement = overlayAddPlace.querySelector('.popup__input_value_namePlace');
const imageInputElement = overlayAddPlace.querySelector('.popup__input_value_imgPlace');

//создание экземпляра класса UserInfo
const userData = new UserInfo({
    userNameSelector: dataUser.userNameSelector,
    userProfessionSelector: dataUser.userProfessionSelector,
    userAvatarSelector: dataUser.userAvatarSelector
});

//создание экземпляра popup с функционалом popupDelete
const popupDelete = new PopupDeleteCard(overlaySelectors.deletePlace, {
    deleteCardHandler: (cardId, delElement) => {
        api.deletecard(cardId)
        .then(data => {
            delElement.remove();
            popupDelete.close();        
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        });
    }
});
popupDelete.setEventListeners();

//создаем попап с изображением
const itemPopupWithImage = new PopupWithImage(overlaySelectors.image);
itemPopupWithImage.setEventListeners();

//функция создания карточки возвращает элемент карточки
function createCard(item) {
    const card = new Card(item, cardSchablonSelector, {
        handleCardClick: () => {
            itemPopupWithImage.open(item.link, item.name);
          }
    }, userId, {
        deleteLikeHandler: (cardId, likeСounter, like) => {
            api.deleteLike(cardId)
            .then(data => {
                likeСounter.textContent = data.likes.length; 
                like.classList.toggle('elements__like_active');
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
        }
    }, {
        putLikeHandler: (cardId, likeСounter, like) => {
            api.putLike(cardId)
            .then(data => {
                likeСounter.textContent = data.likes.length; 
                like.classList.toggle('elements__like_active');
            })
            .catch((err) => {
                console.log(err); // выведем ошибку в консоль
            });
        }
    }, {
        deleteButtonClickHandler: (cardId, element) => {
            popupDelete.open(cardId, element);
        }
    });
    const itemcard = card.generateCard();
    return itemcard;
  }

// подключаем валидатор
//создаем объекты валидации для каждой формы
const validAddPopup = new FormValidator(formSetting, formAddPopup);
validAddPopup.enableValidation();

const validEditPopup = new FormValidator(formSetting, formEditPopup);
validEditPopup.enableValidation();

const validNewAvatarPopup = new FormValidator(formSetting, newsAvatarPopup);
validNewAvatarPopup.enableValidation();

//при открытии попапов скрываем поля ошибок
function hideErrorElements(Popup, ValidPopup) {
    const errorElements = Popup.getFormElement().querySelectorAll('.popup__error');
    errorElements.forEach((errorElement) => {
        if (errorElement.classList.contains(formSetting.errorClass)) {
            ValidPopup.hideErrorElement(errorElement);
        }
    });
    const inputElements = Popup.getFormElement().querySelectorAll('.popup__input');
    inputElements.forEach((inputElement) => {
        if (inputElement.classList.contains(formSetting.inactiveButtonClass)) {
            ValidPopup.hideInputErrorElementStyle(inputElement);
        }
    });
}

//создаем экземпляр класса Api
const api = new Api(options);

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

//создаем создаем экземпляр класса defaultCards чтобы было куда добавлять карточки
const defaultCards = new Section ({ 
    items: [],
    renderer: (item) => {
        elementsBox.prepend(createCard(item));
        } 
}, cardBoxSelector);

const UserInfoPromise = new Promise((resolve, reject) => {
    api.getUserInfo()
    .then(data => {
        userId = data._id;
        userData.setUserInfo(data.name, data.about);
        userData.setAvatar(data.avatar);
        resolve();
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
        reject();
    });
});

//переменная промиосв необходимых для генерирования карточек
const promises = [UserInfoPromise]
//получаем с сервера массив с карточками и каждую добавляем на страницу
Promise.all(promises)
  .then(() => {
    api.getInitialCards()
    .then(data => {
        data.forEach(item => defaultCards.addItem(createCard(item)));
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });  
  });

//создаем попап редактирования передаем классу PopupWithForm селектор формы и функцию-способ обработки закрытия
const editPopup = new PopupWithForm(overlaySelectors.edit, {
    submitHandler: () => {
        renderLoading(editPopup, true);
        //редактируем данные о пользователе на сервере и на странице
        api.setUserInfoOnServer(nameInput.value, jobInput.value)
        .then(data => {
            userData.setUserInfo(data.name, data.about);
            editPopup.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            renderLoading(editPopup, false);
        }); 
    }
}, {
    hideErrrorHandler: () => {
        hideErrorElements(editPopup, validEditPopup);
    }
});
editPopup.setEventListeners();

//создаем попап обновления аватара
const newAvatarPopup = new PopupWithForm(overlaySelectors.setAvatar, {
    submitHandler: () => {
        renderLoading(newAvatarPopup, true);
        const newAvatar = newsAvatarPopup.querySelector('.popup__input_value_newAvatar');
        api.setAvatar(newAvatar.value)
        .then(data => {
            userData.setAvatar(data.avatar);
            validNewAvatarPopup.disableSubmitButton();
            newAvatarPopup.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            renderLoading(newAvatarPopup, false);
        }); 
    }
}, {
    hideErrrorHandler: () => {
        hideErrorElements(newAvatarPopup, validNewAvatarPopup);
    }
});
newAvatarPopup.setEventListeners();

//открытие формы с внесением в нее данных
function editPopupOpen() {
    const actualUserData = userData.getUserInfo();
    nameInput.value = actualUserData.userName;
    jobInput.value = actualUserData.userProfession;
    validEditPopup.disableSubmitButton();
    editPopup.open();
}

//создаем форму добавления новой карточки
const cardAddPopup = new PopupWithForm (overlaySelectors.addPlace, {
    submitHandler: () => {
        renderLoading(cardAddPopup, true);
        const newCardData = {
            name: nameInputElement.value,
            link: imageInputElement.value
          };
        api.setNewCardOnServer(newCardData)
        .then(data => {
            defaultCards.addItem(createCard(data));
            validAddPopup.disableSubmitButton();
            cardAddPopup.close();
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
        .finally(() => {
            renderLoading(cardAddPopup, false);
        }); 
      }
}, {
    hideErrrorHandler: () => {
        hideErrorElements(cardAddPopup, validAddPopup);
    }
});
cardAddPopup.setEventListeners();

//слушатели
openAddButton.addEventListener("click", () => cardAddPopup.open());
openEditButton.addEventListener("click", () => editPopupOpen());
document.querySelector('.profile__avatarBox').addEventListener("click", () => newAvatarPopup.open());