export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

export const showInputError = (formElement, inputElement,errorMessage,settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(settings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(settings.errorClass);
}

export const hideInputError = (formElement, inputElement, settings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(settings.inputErrorClass);
  inputElement.setCustomValidity('');
  errorElement.classList.remove(settings.errorClass);
  errorElement.textContent = '';
};

export const checkInputValidity = (formElement, inputElement,settings) => {
  if(inputElement.validity.patternMismatch){
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity('');
  }

  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement,settings);
  }
};

export const setEventListeners = (formElement,settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function() {
      toggleButtonState(inputList, buttonElement, settings);
      checkInputValidity(formElement, inputElement, settings);
    })
  })
}

export const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    })
    setEventListeners(formElement, settings);
  })
}

export const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

export const toggleButtonState = (inputList, buttonElement,settings) => {
  if(hasInvalidInput(inputList)){
    buttonElement.disabled = true;
    buttonElement.classList.add(settings.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(settings.inactiveButtonClass);
  }
}

export const clearValidation = (formElement, settings) => {
  const inputErrors = formElement.querySelectorAll(settings.inputErrorClass);
  const errorMessages = formElement.querySelectorAll(settings.errorClass);
  if(inputErrors){
    inputErrors.forEach((inputError)=>{
      inputError.classList.remove(settings.inputErrorClass);
    })
    errorMessages.forEach((errorMessage)=>{
      errorMessage.textContent = '';
    })
  }
}

export const enableSubmitButton = (popup, settings) => {
  const buttonElement = popup.querySelector(settings.submitButtonSelector);
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.disabled = false;
}

export const disableSubmitButton = (popup, settings) => {
  const buttonElement = popup.querySelector(settings.submitButtonSelector);
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.disabled = true;
}
