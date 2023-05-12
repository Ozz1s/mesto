export default class Card {
  constructor(cardData, selectorTemplate, openImage) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardData = cardData;
    this._selectorTemplate = selectorTemplate;
    this._openImage = openImage;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._selectorTemplate)
      .content.querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }


  //Лайк
  _likeCard = () => {
    console.log(this._elementLikeButton)
    this._elementLikeButton.classList.toggle('element__like-button-active');
  }
  //Удаление
  _deleteCard = () => {
    this._element.remove();
    this._element = null;
  }

  _handleOpenPopup = () => {
    this._openImage(this._cardData);
  }
  //Навешивание событий
  _setEventListeners() {
    this._elementLikeButton.addEventListener('click', this._likeCard);
    this._elementDeleteButton.addEventListener('click', this._deleteCard);
    this._elementImage.addEventListener('click', this._handleOpenPopup);
  }
  generatCard() {
    this._element = this._getTemplate();
    this._elementImage = this._element.querySelector('.element__image')
    this._elementLikeButton = this._element.querySelector('.element__like-button')
    this._elementDeleteButton = this._element.querySelector('.element__delete-button')
    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._setEventListeners();

    return this._element;
  }

}

