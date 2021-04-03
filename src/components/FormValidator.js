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
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector)); // Массив из всез полей формы
    this._buttonElement = this._form.querySelector(this._submitButtonSelector); // кнопка отправки
    
  }

  // Функция isValid проверяет валидность inputElement
  _isValid(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  // функция showInputError показывает элемент ошибки и добавляет класс ошибки inputElement
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._inactiveButtonClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  };

  // функция hideInputError скрывает элемент ошибки  и убирает класс ошибки inputElement
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._inactiveButtonClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  //публичный метод скрытия элемента ошибки для повторного открытия формы
  hideErrorElement(errorElement) {
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }
  //публичный метод скрытия класса ошибки у инпута
  hideInputErrorElementStyle(inputElement) {
    inputElement.classList.remove(this._inactiveButtonClass);
  }


  // функция setEventListeners добавляет слушатель событий всем полям inputElement и запускает toggleButtonState кнопкам
  _setEventListeners() {
    // Вызовем toggleButtonState чтобы кнопка изначально была неактивна
    this._toggleButtonState();
    // Обойдём все элементы полученной коллекции
    this._inputList.forEach((inputElement) => {
      // каждому полю добавим обработчик события input
      inputElement.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid,
        // передав ей проверяемый элемент
        this._isValid(inputElement);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState();
      });
    });
  }; 

  //функция toggleButtonState переключения активности кнопки в формах
  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton();
    } else {
      this._buttonElement.removeAttribute("disabled");
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  };

  //публичный метод который отключет кнопку используется после успешных сохранений форм
  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  } 

  //функция hasInvalidInput для проверки массива inputList на общую валидность для активации кнопки сабмит
  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }; 

  //функция enableValidation отменяет стандартную обработку формы и вызовет setEventListeners
enableValidation() {
  this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
  this._setEventListeners(this._form);
};

}