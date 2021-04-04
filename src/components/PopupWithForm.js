import { Popup } from './Popup.js';

  //создаем форму редактирования: передаем классу PopupWithForm селектор формы и функцию-способ обработки закрытия
export class PopupWithForm extends Popup {
    constructor( popupSelector, { submitHandler }, { hideErrorHandler } ) {
        super(popupSelector);
        this._submitHandler = submitHandler;
        this._hideErrorHandler = hideErrorHandler;
        this._form = this._popupElement.querySelector('.popup__form');
    }

    open() {
        super.open();
        this._hideErrorHandler();
    }

    // приватный метод который собирает данные всех полей формы
    _getInputValues() {
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    //метод возвращающий элемент формы
    getFormElement() {
        return this._form;
    }

    // дополненный setEventListeners - добавляет обработчик сабмита формы
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._submitHandler(this._getInputValues());
        });
    }

    // дополненный close - сбрасывает форму
    close() {
        this._form.reset();
        super.close();
    }

}