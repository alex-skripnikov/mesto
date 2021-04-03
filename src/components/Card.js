export class Card {
    //конструктор карточки места
	constructor(data, cardSelector,  { handleCardClick }, userId, { deleteLikeHandler }, { putLikeHandler }, { deleteButtonClickHandler }) {
		this._name = data.name;
		this._link = data.link;
    this._likeСounter = data.likes;
		this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._mainUserId = userId; //мой Id чтобы понимать стоит ли уже мой лайк
    this._cardId = data._id;
    this._cardCreatorId = data.owner._id;
    this._deleteLikeHandler = deleteLikeHandler;
    this._putLikeHandler = putLikeHandler;
    this._deleteButtonClickHandler = deleteButtonClickHandler;
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
      this._placeElementPicture(this._element).src = this._link;
      this._placeElementPicture(this._element).alt = this._name;
      this._element.querySelector('.element__placeName').textContent = this._name;
      //проходим циклом по массиву с пролайкавшими и если я там делаем лайк активным
      this._likeСounter.forEach(item => {
        if (item._id === this._mainUserId) {
          this._elementLike(this._element).classList.add('elements__like_active'); 
        }
      });
      this._likeСounterElement(this._element).textContent = this._likeСounter.length;
      //добавление слушателей
      this._setEventListeners();

  	return this._element;
    }

    _placeElementPicture(place) {
      return place.querySelector('.element__piture');
    }

    _elementLike(place) {
      return place.querySelector('.element__like');
    }

    _likeСounterElement(place) {
      return place.querySelector('.element__likeСounter');
    }

    _deleteButton(place) {
      return place.querySelector('.element__deleteButton');
    }

    //создание слушателей лайка и открытия popup c изображением
    _setEventListeners() {
      this._elementLike(this._element).addEventListener('click', () => { this._pushLike(); }); 
      this._placeElementPicture(this._element).addEventListener('click', () => { this._openPicture(); });
      if (this._mainUserId === this._cardCreatorId) {
        this._deleteButton(this._element).addEventListener('click', () => {
          this._deleteButtonClickHandler(this._cardId, this._element);
        });
    }
    else {this._deleteButton(this._element).remove()}


    }

    //метод обработки события лайк
    _pushLike() {
      if (this._elementLike(this._element).classList.contains('elements__like_active')) {
        this._deleteLikeHandler(this._cardId, this._likeСounterElement(this._element), this._elementLike(this._element))
      }
      else {
        this._putLikeHandler(this._cardId, this._likeСounterElement(this._element), this._elementLike(this._element))
      }
    }

    //обработчик события открытия popup c изображением
    _openPicture() {
      this._handleCardClick();
    }
}