export default class FormValidator {
  constructor(config, formElement) {

    this._formElement = formElement;
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formButton = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList = this._formElement.querySelectorAll(this._inputSelector);


  }
  _showError(input) {
    const currentInputErrorContainer = document.querySelector(`.${input.id}-error`);
    currentInputErrorContainer.textContent = input.validationMessage;
    input.classList.add(this._inputErrorClass);
    currentInputErrorContainer.classList.add(this._errorClass);
  }

  _hideError(input) {
    const currentInputErrorContainer = document.querySelector(`.${input.id}-error`);
    currentInputErrorContainer.textContent = '';
    input.classList.remove(this._inputErrorClass);
    currentInputErrorContainer.classList.remove(this._errorClass);
  }

  _disableSubmitButton() {
    this._formButton.classList.add(this._inactiveButtonClass);
    this._formButton.setAttribute('disabled', true);
  }

  enableSubmitButton() {
    this._formButton.classList.remove(this._inactiveButtonClass);
    this._formButton.removeAttribute('disabled');
  }

  _hasInvalidInput() {
    return Array.from(this._inputList).some((input) => !input.checkValidity());
  }

  _setEventListeners() {
    this._disableSubmitButton();
    this._formElement.addEventListener('reset', () => {
      this._disableSubmitButton();
    });
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        if (this._hasInvalidInput()) {
          this._disableSubmitButton();
        } else {
          this.enableSubmitButton();
        }
      })
    })
  }

  _checkInputValidity(input) {
    if (!input.checkValidity()) {
      this._showError(input);
    } else {
      this._hideError(input);
    }
  }

  enableValidation() {
    this._formElement.addEventListener('submit', (event) => {
      event.preventDefault();
    })
    this._setEventListeners();
  }
}



