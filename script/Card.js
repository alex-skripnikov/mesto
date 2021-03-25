import { openPopup, overlayPictureBox, overlayPicture, overlayPictureName  } from './index.js';

// класс карточки места
export class Card {
    //конструктор карточки места
	constructor(data, cardSelector) {
		this._name = data.name;
		this._link = data.link;
		this._cardSelector = cardSelector;
	}

    //приватный метод находит шаблон карточки и клонирует его
	_getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
	}
    
    //публичный метод создания карточки, возвращает элемент карточки
    generateCard() {
      this._element = this._getTemplate();
      const _placeElementPicture = this._element.querySelector('.element__piture');
      _placeElementPicture.src = this._link;
      _placeElementPicture.alt = this._name;
      this._element.querySelector('.element__placeName').textContent = this._name;

      //добавление слушателей
      this._setEventListeners();

  	return this._element;
    }

    //создание слушателей лайка, удаления места и открытия popup c изображением
    _setEventListeners() {
      this._element.querySelector('.element__like').addEventListener('click', () => { this._pushLike(); });
      this._element.querySelector('.element__deleteButton').addEventListener('click', () => { this._deletePlace(); });
      this._element.querySelector('.element__piture').addEventListener('click', () => { this._openPicture(); });
    }

    //обработчик события лайка
    _pushLike() {
      this._element.querySelector('.element__like').classList.toggle('elements__like_active');
    }

    //обработчик события удаления места
    _deletePlace() {
        this._element.querySelector('.element__deleteButton').closest('.element').remove();
    }
  
    //обработчик события открытия popup c изображением
    _openPicture() {
        overlayPicture.src = this._link;
        overlayPicture.alt = this._name;
        overlayPictureName.textContent = this._name;
        openPopup(overlayPictureBox);
    }
}