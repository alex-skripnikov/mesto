import { openPopup } from './index.js';

const overlayPictureBox = document.querySelector('.overlay_type_image'); // секция попапа большой картинки
const overlayPicture = overlayPictureBox.querySelector('.popup__piture'); // картинка попапа большой картинки
const overlayPictureName = overlayPictureBox.querySelector('.popup__pitureName'); // подпись попапа большой картинки

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
      this._setLiketListeners();//слушатель лайка
      this._setDeletePlaceListeners();//слушатель удаления места
      this._setOpenPicturetListeners();//слушатель открытия popup c изображением

  	return this._element;
    }

    //создание слушателя лайка
    _setLiketListeners() {
      this._element.querySelector('.element__like').addEventListener('click', () => {
      this._pushLike();
    });
    }

    //обработчик события лайка
    _pushLike() {
      this._element.querySelector('.element__like').classList.toggle('elements__like_active');
    }


    //создание слушателя удаления места
    _setDeletePlaceListeners() {
        this._element.querySelector('.element__deleteButton').addEventListener('click', () => {
        this._deletePlace();
      });
      }
  
    //обработчик события удаления места
    _deletePlace() {
        this._element.querySelector('.element__deleteButton').closest('.element').remove();
    }

    //создание слушателя открытия popup c изображением
    _setOpenPicturetListeners() {
        this._element.querySelector('.element__piture').addEventListener('click', () => {
        this._openPicture();
      });
    }
  
    //обработчик события открытия popup c изображением
    _openPicture() {
        overlayPicture.src = this._link;
        overlayPicture.alt = this._name;
        overlayPictureName.textContent = this._name;
        openPopup(overlayPictureBox);
    }
}