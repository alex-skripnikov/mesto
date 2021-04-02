import { Popup } from './Popup.js';
import { deleteCardOfSevere } from '../pages/index.js';

export class PopupDeleteCard extends Popup {
    /*constructor( popupSelector, { FormSubmit }) {
        super(popupSelector);
        this._deleteCardOfSevere = this._popupElement.querySelector('.popup__form');
    }*/

	//публичный метод отвечающий за открытие Popup
    open(item, itemcard) {
        //добавить слушатель для кнопки удаления
        this._popupElement.querySelector('.popup__deleteCardButton').addEventListener("click", _deletecards (item, itemcard));
        super.open();
    }

    _deletecards (item, itemcard) {
        deleteCardOfSevere(item, itemcard)
    }

    close() {
        //снять слушатель для кнопки удаления
        this._popupElement.querySelector('.popup__deleteCardButton').removeEventListener("click", _deletecards (item, itemcard));
        super.close();
    }
}