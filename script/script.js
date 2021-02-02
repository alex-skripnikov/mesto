//Переменные
const overlayEdit = document.querySelector('.overlay_type_edit'); // секция попапа редактирования
const openEditButton = document.querySelector('.profile__editButton'); // кнопка открытия попапа редактирования
const closeEditButton = overlayEdit.querySelector('.popup__closeButton'); // кнопка закрытия попапа редактирования
const profileTitle = document.querySelector('.profile__title'); // текущее имя для попапа редактирования
const profileSubtitle = document.querySelector('.profile__subtitle'); // текущая работа для попапа редактирования
const formEditPopup = overlayEdit.querySelector('.popup__form'); // форма попапа редактирования
const nameInput = formEditPopup.querySelector('.popup__input_value_name'); // поле имя в форме попапа редактирования
const jobInput = formEditPopup.querySelector('.popup__input_value_job'); // поле работа в форме попапа редактирования

const overlayAddPlace = document.querySelector('.overlay_type_addPlace'); // секция попапа добавления места
const openAddButton = document.querySelector('.profile__addButton'); // кнопка открытия попапа добавления места
const closeAddBoxButton = overlayAddPlace.querySelector('.popup__closeButton'); // кнопка закрытия попапа добавления места
const formAddPopup = overlayAddPlace.querySelector('.popup__form'); // форма попапа добавления места
const namePlace = formAddPopup.querySelector('.popup__input_value_namePlace'); // поле имя в форме добавления места
const imgPlace = formAddPopup.querySelector('.popup__input_value_imgPlace'); // поле картинка в форме добавления места

const overlayPictureBox = document.querySelector('.overlay_type_image'); // секция попапа большой картинки
const overlayPicture = overlayPictureBox.querySelector('.popup__piture'); // картинка попапа большой картинки
const overlayPictureName = overlayPictureBox.querySelector('.popup__pitureName'); // подпись попапа большой картинки
const closePictureButton = overlayPictureBox.querySelector('.popup__closeButton'); // кнопка закрытия попапа редактирования

const elementsBox = document.querySelector('.elements'); //общий контейнер для мест, сюда добавляем места функцией addplace
const placeTemplate = elementsBox.querySelector('.elements__articleTemplate').content; //шаблон для мест используем в функции addplace

//функция создания элемента нового места
function getCardElement(name, link) {
    const placeElement = placeTemplate.querySelector('.element').cloneNode(true); // если добавить вне функции перезаписывает элементы!
    const placeElementPicture = placeElement.querySelector('.element__piture');
    placeElementPicture.src = link;
    placeElementPicture.alt = name;
    placeElement.querySelector('.element__placeName').textContent = name;
    return(placeElement);
}

//функция добавления места
function addplace(name, link) {
    elementsBox.prepend(getCardElement(name, link));
};

//выводим массив с базовыми местами
initialCards.forEach(function (item) {
    addplace(item.name, item.link);
});

//Функция внесения данных в форму перед открытием попапа редактирования
function addValuePopup() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
    openPopup(overlayEdit);
}

//Функция открытия popup
function openPopup(type) {
    type.classList.add('overlay_active');
}

//Функция закрытия popup без сохранения данных
function closePopup(type) {
    type.classList.remove('overlay_active')
}

//Функция закрытия popup редактирования с сохранением данных
function changeFormEdit (evt) {
    evt.preventDefault(); //оменяем стандартную обработку submit
    const lokalFormButton = evt.target.querySelector('.popup__saveButton');
    if (!lokalFormButton.classList.contains('popup__saveButton_disabled')) {
        profileTitle.textContent = nameInput.value;
        profileSubtitle.textContent = jobInput.value;
        lokalFormButton.classList.add('popup__saveButton_disabled');
        closePopup(overlayEdit);
    };
}

//Функция закрытия popup c создание нового места
function createPlace (evt) {
    evt.preventDefault(); //оменяем стандартную обработку submit
    const lokalFormButton = evt.target.querySelector('.popup__saveButton');
    if (!lokalFormButton.classList.contains('popup__saveButton_disabled')) {
        addplace(namePlace.value, imgPlace.value);
        formAddPopup.reset();
        lokalFormButton.classList.add('popup__saveButton_disabled');
        closePopup(overlayAddPlace);
    };
}

//функция закрытия popup по клику на overlay
function closePopupByOverlay(evt, type) {
    if (evt.target === type) {
        closePopup(type);
    }
}

//функция закрытия popup по кнопке Esc
function closePopupByEsc(evt) {
    if (evt.key === 'Escape') {
        closePopup(overlayEdit);
        closePopup(overlayAddPlace);
        closePopup(overlayPictureBox);
    }
}

//функция удаления 
function deletePlace(evt) {
    evt.target.closest('.element').remove();
}

//функция добавления лайка
function pushLike(evt) {
    evt.target.classList.toggle('elements__like_active');
}

//функция открытия popup c изображением
function openPicture(evt) {
    overlayPicture.src = evt.target.src;
    overlayPicture.alt = evt.target.alt;
    overlayPictureName.textContent = evt.target.alt;
    openPopup(overlayPictureBox);
}

//функция обработчик клика на elementsBox чтобы убрать создание слушателей из getCardElement
function processingClickElementBox(evt) {
    if (evt.target.classList.contains('element__like')) {
        pushLike(evt);
    };
    if (evt.target.classList.contains('element__piture')) {
        openPicture(evt);
    };
    if (evt.target.classList.contains('element__deleteButton')) {
        deletePlace(evt);
    };
}

//слушатели
openAddButton.addEventListener("click", () => openPopup(overlayAddPlace));
closeAddBoxButton.addEventListener("click", () => closePopup(overlayAddPlace));
openEditButton.addEventListener("click", () => addValuePopup());
closeEditButton.addEventListener("click", () => closePopup(overlayEdit));
formEditPopup.addEventListener('submit', changeFormEdit);
formAddPopup.addEventListener('submit', createPlace);
closePictureButton.addEventListener("click", () => closePopup(overlayPictureBox));
overlayEdit.addEventListener("click", (evt) => closePopupByOverlay(evt, overlayEdit));
overlayAddPlace.addEventListener("click", (evt) => closePopupByOverlay(evt, overlayAddPlace));
overlayPictureBox.addEventListener("click", (evt) => closePopupByOverlay(evt, overlayPictureBox));
document.body.addEventListener("keydown", (evt) => closePopupByEsc(evt));
elementsBox.addEventListener("click", (evt) => processingClickElementBox(evt));