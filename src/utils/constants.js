export const formSetting = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__saveButton',
    inactiveButtonClass: 'popup__saveButton_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
    errorElementClass: '.popup__error'
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

export function renderLoading(isLoading) {
    const newButtonName = document.querySelector('.overlay_active .popup__saveButton');
    const staticContent = newButtonName.querySelector('.popup__staticContent');
    const processContent = newButtonName.querySelector('.popup__processContent');
    if(isLoading) {
        staticContent.classList.add('popup__staticContent_hiden');
        processContent.classList.add('popup__processContent_active');
    } else {
        staticContent.classList.remove('popup__staticContent_hiden');
        processContent.classList.remove('popup__processContent_active');
    }
}