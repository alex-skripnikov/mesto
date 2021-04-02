export class Popup {
	constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(this._popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this)
	}

	//публичный метод отвечающий за открытие Popup
    open() {
        this._popupElement.classList.add('overlay_active');
        document.addEventListener('keydown', this._handleEscClose);
    }

	//публичный метод отвечающий за закрытие Popup
    close() {
        this._popupElement.classList.remove('overlay_active');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    //приватный метод отвечающий за закрытие Popup по кнопке Esc
    _handleEscClose(event) {
        if (event.code === 'Escape') { this.close(); }
    } 

    //публичный метод который добавляет слушатель клика иконке закрытия попапа
    setEventListeners() {
        this._popupElement.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('overlay_active')) { this.close(); }
            if (evt.target.classList.contains('popup__closeButton')) { this.close(); }
    })
    }
};