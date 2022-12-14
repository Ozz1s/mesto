const aboutPopup = document.querySelector('.popup');
const popupCont = document.querySelector('.popup__container');
const closeBtn = popupCont.querySelector('.popup__close-btn');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__name_input_name');
const busyInput = formElement.querySelector('.popup__name_input_busy');
const saveBtn = formElement.querySelector('.popup__save-btn');
const aboutButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__title');
const profileBusy = document.querySelector('.profile__subtitle');

function openPopup() {
    aboutPopup.classList.add('popup_opened');
    nameInput.value = profileName.textContent;
    busyInput.value = profileBusy.textContent;
}
aboutButton.addEventListener('click', openPopup);

function closePopup() {
    aboutPopup.classList.remove('popup_opened');
}
closeBtn.addEventListener('click', closePopup);

function formSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value
    profileBusy.textContent = busyInput.value
    closePopup(aboutPopup);
}
formElement.addEventListener('submit', formSubmit);