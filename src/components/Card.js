import { api } from '../pages/index.js';

export class Card {
    //конструктор карточки места
	constructor(data, cardSelector,  { handleCardClick }, userId) {
		this._name = data.name;
		this._link = data.link;
    this._likeСounter = data.likes;
		this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._mainUserId = userId; //мой Id чтобы понимать стоит ли уже мой лайк
    this._CardId = data._id;
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
      //проходим циклом по массиву с пролайкавшими и если я там делаем лайк активным
      this._likeСounter.forEach(item => {
        if (item._id === this._mainUserId) {
          this._element.querySelector('.element__like').classList.add('elements__like_active');
        }
      }
        );
      this._element.querySelector('.element__likeСounter').textContent = this._likeСounter.length;
      //добавление слушателей
      this._setEventListeners();

  	return this._element;
    }

    //создание слушателей лайка и открытия popup c изображением
    _setEventListeners() {
      this._element.querySelector('.element__like').addEventListener('click', () => { this._pushLike(); });
      this._element.querySelector('.element__piture').addEventListener('click', () => { this._openPicture(); });
    }

    _pushLike() {
      if (this._element.querySelector('.element__like').classList.contains('elements__like_active')) {this._deleteLike()}
      else {this._putLike()}
      }

    _deleteLike() {
      api.deleteLike(this._CardId)
      .then(data => {
        this._element.querySelector('.element__likeСounter').textContent = data.likes.length;
        this._element.querySelector('.element__like').classList.toggle('elements__like_active');
      })
      .catch((err) => {
          console.log(err); // выведем ошибку в консоль
      });
    }

    _putLike() {
      api.putLike(this._CardId)
      .then(data => {
        this._element.querySelector('.element__likeСounter').textContent = data.likes.length;
        this._element.querySelector('.element__like').classList.toggle('elements__like_active');
      })
      .catch((err) => {
          console.log(err); // выведем ошибку в консоль
      });
    }
  
    //обработчик события открытия popup c изображением
    _openPicture() {
      this._handleCardClick();
    }
}