import { Popup } from './Popup.js';

export class PopupDeleteCard extends Popup {
    constructor(popupSelector, { deleteCardHandler }) {
        super(popupSelector);
        this._deleteCardButton = this._popupElement.querySelector('.popup__deleteCardButton');
        this._deleteCardHandler = deleteCardHandler;
        this._deleteClick = this._deleteClick.bind(this)
        }

	//публичный метод отвечающий за открытие Popup
    open(cardId, element) { 
        this._cardId = cardId;
        this._delElement = element;
        //добавить слушатель для кнопки удаления
        this._deleteCardButton.addEventListener("click", this._deleteClick);
        super.open();
    }

    _deleteClick() {
        this._deleteCardHandler(this._cardId, this._delElement);
    }

    close() {
        //снять слушатель для кнопки удаления
        this._deleteCardButton.removeEventListener("click", this._deleteClick);
        super.close();
    }
}