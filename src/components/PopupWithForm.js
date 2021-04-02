import { Popup } from './Popup.js';

  //создаем форму редактирования: передаем классу PopupWithForm селектор формы и функцию-способ обработки закрытия
export class PopupWithForm extends Popup {
    constructor( popupSelector, { FormSubmit }) {
        super(popupSelector);
        this._FormSubmit = FormSubmit;
        this._form = this._popupElement.querySelector('.popup__form');
    }

    // приватный метод который собирает данные всех полей формы
    _getInputValues() {
        this._inputList = this._popupElement.querySelectorAll('.popup__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    // дополненный setEventListeners - добавляет обработчик сабмита формы
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
          evt.preventDefault();
          this._FormSubmit(this._getInputValues());
        });
    }

    // дополненный close - сбрасывает форму
    close() {
        this._form.reset();
        super.close();
    }

}