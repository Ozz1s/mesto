const listPopups = Array.from(document.querySelectorAll('.popup'));
const popupCont = document.querySelector('.popup__container');
const closeBtnProfile = document.querySelector('.popup__close-btn_profile');


// Form edit profile
const profilePopup = document.querySelector('.popup_edit_profile');
const formElement = profilePopup.querySelector('.popup__form');
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
function closePopupOnEsc (evt) {
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

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value
    profileBusy.textContent = busyInput.value
    closePopup(profilePopup);
}
formElement.addEventListener('submit', handleProfileFormSubmit);

function likeCard (evt) {
  evt.target.classList.toggle('element__like-button-active');
}

function deleteCard (card) {
  card.remove()
}

function openImage(src , text){
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

   deleteButton.addEventListener('click' , () => deleteCard(card));
   likeButton.addEventListener('click' , (evt) => likeCard(evt));
   cardImg.addEventListener('click' , () => openImage(item.link , item.name));
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

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const card = createCard({name: titleInput.value, link: srcInput.value});
  elemPlace.prepend(card);
  closePopup(addCardPopup);
  evt.target.reset();
}

formAddCArd.addEventListener('submit' , handleAddFormSubmit);

listPopups.forEach(popupItem => {
  popupItem.addEventListener("click", evt => {
    if(evt.target.classList.contains('popup_opened')) {
      closePopup(popupItem);
    }
  })
})