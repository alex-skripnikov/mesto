// Функция isValid проверяет валидность inputElement
const isValid = (formElement, inputElement, inputObject) => {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, inputObject);
    } else {
      hideInputError(formElement, inputElement, inputObject);
    }
}; 

// функция showInputError показывает элемент ошибки  и добавляет класс ошибки inputElement
const showInputError = (formElement, inputElement, errorMessage, inputObject) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(inputObject.inputErrorClass);
    errorElement.classList.add(inputObject.errorClass);
    errorElement.textContent = errorMessage;
};

// функция hideInputError скрывает элемент ошибки  и убирает класс ошибки inputElement
const hideInputError = (formElement, inputElement, inputObject) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(inputObject.inputErrorClass);
    errorElement.classList.remove(inputObject.errorClass);
    errorElement.textContent = '';
}; 

// функция setEventListeners добавляет слушатель событий всем полям inputElement и запускает toggleButtonState кнопкам
const setEventListeners = (formElement, inputObject) => {
    // Найдём все поля формы и сделаем из них массив
    const inputList = Array.from(formElement.querySelectorAll(inputObject.inputSelector));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(inputObject.submitButtonSelector);
    // Вызовем toggleButtonState чтобы кнопка изначально была неактивна
    toggleButtonState(inputList, buttonElement, inputObject);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        isValid(formElement, inputElement, inputObject);

        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        toggleButtonState(inputList, buttonElement, inputObject);
      });
    });
}; 

//функция enableValidation найдёт и переберёт все формы на странице и вызовет setEventListeners
const enableValidation = (inputObject) => {
    const formList = Array.from(document.querySelectorAll(inputObject.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement, inputObject);
    });
};
  
//функция hasInvalidInput для проверки массива inputList на общую валидность для активации кнопки сабмит
const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}; 

//функция toggleButtonState переключения активности кнопки в формах
const toggleButtonState = (inputList, buttonElement, inputObject) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inputObject.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inputObject.inactiveButtonClass);
  }
}; 

// Вызовем функцию enableValidation для запуска валидации формы
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__saveButton',
  inactiveButtonClass: 'popup__saveButton_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});