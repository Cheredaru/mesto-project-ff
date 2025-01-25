import './styles/index.css';
import {initialCards} from './scripts/cards.js';
import {deleteCard, likeCard, createCard} from './scripts/components/card.js';
import {openPopup, closePopup, overlayListener} from './scripts/components/modal.js';

const placesList = document.querySelector('.places__list');

const popupProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupFullImage = document.querySelector('.popup_type_image');

const buttonOpenFormProfile = document.querySelector('.profile__edit-button');
const buttonOpenAddCard = document.querySelector('.profile__add-button');
const buttonsPopupClose = document.querySelectorAll('.popup__close');

const formEditProfile = document.forms.editProfile;
const formNewPlace = document.forms.newPlace;

const formNewPlaceName = formNewPlace.querySelector('.popup__input_type_card-name');
const formNewPlaceAlt = formNewPlace.querySelector('.popup__input_type_card-name');
const formNewPlaceLink = formNewPlace.querySelector('.popup__input_type_url');

const inputJob = document.querySelector('.popup__input_type_description')
const inputName = document.querySelector('.popup__input_type_name');
const profileDescription = document.querySelector('.profile__description');
const profileTitle = document.querySelector('.profile__title');

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputJob.value;
  closePopup(popupProfile);
}

function handleImageFormSubmit(evt,name,link,alt) {
  evt.preventDefault();
  name = formNewPlaceName.value;
  link = formNewPlaceLink.value;
  alt = formNewPlaceAlt.value;
  const newCard = createCard(name, link, alt, deleteCard, likeCard, openImagePopup);
  placesList.prepend(newCard);
  formNewPlace.reset();
  closePopup(popupAddCard);
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
  popupFullImage.querySelector('.popup__image').src = evt.target.src;
  popupFullImage.querySelector('.popup__image').alt = evt.target.alt;
  popupFullImage.querySelector('.popup__caption').textContent = evt.target.alt;
  openPopup(popupFullImage);
}

initialCards.forEach((el) => {
  placesList.append(createCard(el.name, el.link, el.alt, deleteCard, likeCard,openImagePopup));
})

buttonsPopupClose.forEach((el) => {
  el.addEventListener('click', () => closePopup(el.closest('.popup')));
});

buttonOpenFormProfile.addEventListener('click', openPopupProfile);
buttonOpenAddCard.addEventListener('click', openPopupAddCard);

formEditProfile.addEventListener('submit', handleEditFormSubmit);
formNewPlace.addEventListener('submit',handleImageFormSubmit);

popupProfile.addEventListener('click', overlayListener);
popupAddCard.addEventListener('click', overlayListener);
popupFullImage.addEventListener('click', overlayListener);
