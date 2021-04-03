export const formSetting = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__saveButton',
    inactiveButtonClass: 'popup__saveButton_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

export const cardSchablonSelector = '.elements__articleTemplate';

export const cardBoxSelector = '.elements';

export const dataUser = {
    userNameSelector: '.profile__title',
    userProfessionSelector: '.profile__subtitle',
    userAvatarSelector: '.profile__avatar'
};

export const overlaySelectors = {
    addPlace: '.overlay_type_addPlace',
    setAvatar: '.overlay_type_setAvatar',
    edit: '.overlay_type_edit',
    image: '.overlay_type_image',
    deletePlace: '.overlay_type_deletePlace'
};

export const options = {
    baseurl: 'https://mesto.nomoreparties.co/v1/cohort-21',
    headers: {
        authorization: '2fa4574e-067b-43c1-ad9a-ac01ea748456',
        'Content-Type': 'application/json',
    },
}

//переменная для временного хранения текста на кнопке если объявить через const пишет что только для чтения
export let oldButtonName;
//функция отображжения слова "Сохранение..." в формах
export function renderLoading(popupName, isLoading) {
    const newButtonName = popupName._popupElement.querySelector('.popup__saveButton');
    if(isLoading) {
        oldButtonName = newButtonName.textContent;
        newButtonName.textContent = 'Сохранение...';
    } else {
        newButtonName.textContent = oldButtonName;
    }
}