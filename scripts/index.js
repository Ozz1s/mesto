const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
      },
      {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
      },
      {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
      },
      {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
      },
      {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
      },
      {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
      }
    ];
const aboutPopup = document.querySelector('.popup');
const popupCont = document.querySelector('.popup__container');
const closeBtnProfile = document.querySelector('.popup__close-btn_profile');
const formElement = document.querySelector('.popup__form');

// Form edit profile
const profilePopup = document.querySelector('.popup_edit_profile');
const nameInput = formElement.querySelector('.popup__name_input_name');
const busyInput = formElement.querySelector('.popup__name_input_busy');
const saveBtn = formElement.querySelector('.popup__save-btn');
const aboutButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileBusy = document.querySelector('.profile__subtitle');

// Form add card 
const addCardPopup = document.querySelector('.popup_add_card');
const profileAddBtn = document.querySelector('.profile__add-button');
const closeBtnAdd = document.querySelector('.popup__close-btn_add');
const formAddCArd = addCardPopup.querySelector('.popup__form');

const titleInput = document.querySelector('.popup__name_input_title');
const srcInput = document.querySelector('.popup__name_input_src');

const imagePopup = document.querySelector('.popup_images-open');
const showImage = document.querySelector('.popup__image');
const showTitle = document.querySelector('.popup__header-img');
const closeBtnImage = document.querySelector('.popup__close-btn-img');

const elemPlace = document.querySelector('.elements');
const cardTemplate = document
.querySelector('.elements-list')
.content
.querySelector('.element');

//Open
function openPopup(popup) {
    popup.classList.add('popup_opened');
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

// Close 
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
// close edit form
function closeProfilePopup(){
    closePopup(profilePopup);
}
// close add form
function closeAddCardPopup(){
    closePopup(addCardPopup);
}

function closeImagePopup() {
  closePopup(imagePopup);
}

function formSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value
    profileBusy.textContent = busyInput.value
    closePopup(aboutPopup);
}
formElement.addEventListener('submit', formSubmit);

function cardLike (evt) {
  evt.target.classList.toggle('element__like-button-active');
}

function cardDelete (card) {
  card.remove()
}

function imageOpen(src , text){
  openPopup(imagePopup);
  showImage.src = src;
  showImage.alt = text;
  showTitle.textContent = text;
}

function createCard(item) {
   const card = cardTemplate.cloneNode(true);
   const cardImg = card.querySelector('.element__image');
   const cardName = card.querySelector('.element__title');
   const deleteButton = card.querySelector('.element__delete-button');
   const likeButton = card.querySelector('.element__like-button');
   cardImg.src = item.link;
   cardImg.alt = item.name;
   cardName.textContent = item.name;

   deleteButton.addEventListener('click' , () => cardDelete(card));
   likeButton.addEventListener('click' , (evt) => cardLike(evt));
   cardImg.addEventListener('click' , () => imageOpen(item.link , item.name));
   return card;
}

function renderCard(){
    initialCards.forEach(function(item) {
        const cardHtml = createCard(item);
        elemPlace.append(cardHtml);
    })
}

renderCard();

closeBtnProfile.addEventListener('click' , closeProfilePopup);
closeBtnAdd.addEventListener('click' , closeAddCardPopup);
closeBtnImage.addEventListener('click' , closeImagePopup);

function FormAddCardSubmit(evt) {
  evt.preventDefault();
  const card = createCard({name: titleInput.value, link: srcInput.value});
  elemPlace.prepend(card);
  closePopup(addCardPopup);
  evt.target.reset();
}

formAddCArd.addEventListener('submit' , FormAddCardSubmit);