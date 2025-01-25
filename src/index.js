import './styles/index.css';
import {initialCards} from './scripts/cards.js';
import {deleteCard, likeCard, createCard} from './scripts/components/card.js';
import {openPopup, closePopup, overlayListener} from './scripts/components/modal.js';

const placesList = document.querySelector('.places__list');
const popup = document.querySelector('.popup');

const popupProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');

const buttonOpenFormProfile = document.querySelector('.profile__edit-button');
const buttonOpenAddCard = document.querySelector('.profile__add-button');
const buttonsPopupClose = document.querySelectorAll('.popup__close');

const formEditProfile = document.forms.editProfile;
const formNewPlace = document.forms.newPlace;

const inputJob = document.querySelector('.popup__input_type_description')
const inputName = document.querySelector('.popup__input_type_name');
const profileDescription = document.querySelector('.profile__description');
const profileTitle = document.querySelector('.profile__title');

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputJob.value;
  closePopup(popup);
}

function handleImageFormSubmit(evt) {
  evt.preventDefault();
  const name = formNewPlace.querySelector('.popup__input_type_card-name').value;
  const alt = formNewPlace.querySelector('.popup__input_type_card-name').value;
  const link = formNewPlace.querySelector('.popup__input_type_url').value;
  const newCard = createCard(name, link, alt, deleteCard, likeCard, openImagePopup);
  placesList.prepend(newCard);
  formNewPlace.reset();
  closePopup(evt.target.closest('.popup'))
}

function openPopupProfile(){
  inputJob.value = profileDescription.textContent;
  inputName.value = profileTitle.textContent;
  openPopup(popupProfile);
}

function openPopupAddCard(){
  openPopup(popupAddCard);
}

function openImagePopup(evt){
  const popupCard = document.querySelector('.popup_type_image');
  openPopup(popupCard);
  popupCard.querySelector('.popup__image').src = evt.target.src;
  popupCard.querySelector('.popup__image').alt = evt.target.alt;
  popupCard.querySelector('.popup__caption').textContent = evt.target.alt;
}

initialCards.forEach((el) => {
  placesList.append(createCard(el.name, el.link, el.alt, deleteCard, likeCard,openImagePopup));
})

buttonsPopupClose.forEach((el) => {
  el.addEventListener('click', () => closePopup(el.closest('.popup')));
});

buttonOpenFormProfile.addEventListener('click', openPopupProfile);
buttonOpenAddCard.addEventListener('click', openPopupAddCard);
popup.addEventListener('click', overlayListener);
formEditProfile.addEventListener('submit', handleEditFormSubmit);
formNewPlace.addEventListener('submit',handleImageFormSubmit);
