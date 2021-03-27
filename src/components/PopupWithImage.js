import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._overlayPicture = this._popupElement.querySelector('.popup__piture')
        this._overlayPictureName = this._popupElement.querySelector('.popup__pitureName')
        }

	//публичный метод отвечающий за открытие Popup
    open(link, name) {
        this._overlayPicture.src = link;
        this._overlayPicture.alt = name;
        this._overlayPictureName.textContent = name;
        super.open();;
    }
}