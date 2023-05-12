import Card from './Card.js';
import { initialCards } from './initCards.js';
import FormValidator from './FormValidator.js';

const listPopups = Array.from(document.querySelectorAll('.popup'));
const closeBtnProfile = document.querySelector('.popup__close-btn_profile');

// Form edit profile
const profilePopup = document.querySelector('.popup_edit_profile');
const formprofilePopup = profilePopup.querySelector('.popup__form');
const nameInput = formprofilePopup.querySelector('.popup__name_input_name');
const busyInput = formprofilePopup.querySelector('.popup__name_input_busy');
const saveBtn = formprofilePopup.querySelector('.popup__save-btn');
const aboutButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileBusy = document.querySelector('.profile__subtitle');

// Form add card 
const addCardPopup = document.querySelector('.popup_add_card');
const profileAddBtn = document.querySelector('.profile__add-button');
const closeBtnAdd = document.querySelector('.popup__close-btn_add');
const formAddCard = addCardPopup.querySelector('.popup__form');

const titleInput = document.querySelector('.popup__name_input_title');
const srcInput = document.querySelector('.popup__name_input_src');

const imagePopup = document.querySelector('.popup_images-open');
const showImage = document.querySelector('.popup__image');
const showTitle = document.querySelector('.popup__header-img');
const closeBtnImage = document.querySelector('.popup__close-btn-img');
const cardContainer = document.querySelector('.elements');

const selectorTemplate = '.elements-list';

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__name',
  submitButtonSelector: '.popup__save-btn',
  inactiveButtonClass: 'popup__button-inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_active'
};

const profileEditFormValidator = new FormValidator(config, formprofilePopup);
profileEditFormValidator.enableValidation();

const addPhotoFormValidator = new FormValidator(config, formAddCard);
addPhotoFormValidator.enableValidation();

//Open
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener("keydown", closePopupOnEsc);

}

// Open edit form
function openProfilePopup(e) {
  e.preventDefault();
  nameInput.value = profileName.textContent;
  busyInput.value = profileBusy.textContent;
  openPopup(profilePopup);
}

// Open add form
function openAddCardPopup(e) {
  e.preventDefault();
  openPopup(addCardPopup);
}

aboutButton.addEventListener('click', openProfilePopup);
profileAddBtn.addEventListener('click', openAddCardPopup);
// Close popup on Esc
function closePopupOnEsc(evt) {
  if (evt.key === "Escape") {
    closePopup(document.querySelector(".popup_opened"));
  }
}

// Close 
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener("keydown", closePopupOnEsc);
}
// close edit form
function closeProfilePopup() {
  closePopup(profilePopup);
}
// close add form
function closeAddCardPopup() {
  closePopup(addCardPopup);
}

function closeImagePopup() {
  closePopup(imagePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value
  profileBusy.textContent = busyInput.value
  closePopup(profilePopup);
}
formprofilePopup.addEventListener('submit', handleProfileFormSubmit);

function openImage(cardData) {
  openPopup(imagePopup);
  showImage.src = cardData.link;
  showImage.alt = cardData.name;
  showTitle.textContent = cardData.name;
}

function createCard(element) {
  const card = new Card(element, selectorTemplate, openImage);
  return card.generatCard();
}
function addCard(container, card) {
  container.prepend(card)
}

initialCards.forEach((item) => {
  addCard(cardContainer, createCard(item))
})

closeBtnProfile.addEventListener('click', closeProfilePopup);
closeBtnAdd.addEventListener('click', closeAddCardPopup);
closeBtnImage.addEventListener('click', closeImagePopup);

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const cardData = { name: titleInput.value, link: srcInput.value };
  addCard(cardContainer, createCard(cardData))
  closePopup(addCardPopup);
  evt.target.reset();
}

formAddCard.addEventListener('submit', handleAddFormSubmit);

listPopups.forEach(popupItem => {
  popupItem.addEventListener("click", evt => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popupItem);
    }
  })
})