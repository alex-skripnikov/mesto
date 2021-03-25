// класс FormValidator  
export class FormValidator {
  //конструктор карточки места
  constructor(data, form) {
    this._formSelector = data.formSelector;
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._inactiveButtonClass = data.inactiveButtonClass;
    this._inputErrorClass = data.inputErrorClass;
    this._errorClass = data.errorClass;
    this._form = form;
  }

  // Функция isValid проверяет валидность inputElement
  _isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  }; 

  // функция showInputError показывает элемент ошибки и добавляет класс ошибки inputElement
  _showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._inactiveButtonClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  // функция hideInputError скрывает элемент ошибки  и убирает класс ошибки inputElement
  _hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._inactiveButtonClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }; 

  // функция setEventListeners добавляет слушатель событий всем полям inputElement и запускает toggleButtonState кнопкам
  _setEventListeners = (formElement) => {
    // Найдём все поля формы и сделаем из них массив
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    // Вызовем toggleButtonState чтобы кнопка изначально была неактивна
    this._toggleButtonState(inputList, buttonElement);
    // Обойдём все элементы полученной коллекции
    inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей форму и проверяемый элемент
        this._isValid(formElement, inputElement);

        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }; 

  //функция toggleButtonState переключения активности кнопки в формах
  _toggleButtonState = (inputList, buttonElement) => {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  //функция hasInvalidInput для проверки массива inputList на общую валидность для активации кнопки сабмит
  _hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

  //функция enableValidation отменяет стандартную обработку формы и вызовет setEventListeners
enableValidation = () => {
  this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  this._setEventListeners(this._form);
};

}