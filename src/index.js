import './styles/index.css';
import {deleteCard, toggleLikeState, createCard} from './scripts/components/card.js';
import {openPopup, closePopup, overlayListener} from './scripts/components/modal.js';
import {validationSettings, enableValidation, clearValidation} from './scripts/components/validation.js'
import {getAvatarInfo, getInitialCards, editProfileData, addNewCard, getLikesCount, editAvatar} from './scripts/components/api.js'

export const placesList = document.querySelector('.places__list');

const popupProfile = document.querySelector('.popup_type_edit');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupFullImage = document.querySelector('.popup_type_image');
const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');

const buttonOpenFormProfile = document.querySelector('.profile__edit-button');
const buttonOpenAddCard = document.querySelector('.profile__add-button');
const buttonsPopupClose = document.querySelectorAll('.popup__close');

const formEditProfile = document.forms.editProfile;
const formNewPlace = document.forms.newPlace;
const formEditAvatar = document.forms.formEditAvatar;

const formNewPlaceName = formNewPlace.querySelector('.popup__input_type_card-name');
const formNewPlaceAlt = formNewPlace.querySelector('.popup__input_type_card-name');
const formNewPlaceLink = formNewPlace.querySelector('.popup__input_type_url');

const inputJob = document.querySelector('.popup__input_type_description')
const inputName = document.querySelector('.popup__input_type_name');
const profileDescription = document.querySelector('.profile__description');
const profileTitle = document.querySelector('.profile__title');
const profileImage = document.querySelector('.profile__image');

const avatarNewLink = formEditAvatar.querySelector('.popup__input_type_url');

enableValidation(validationSettings);

function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputJob.value;
  closePopup(popupProfile);
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  profileImage.style.backgroundImage = `url('${avatarNewLink.value}')`;
  closePopup(popupEditAvatar);
  formEditAvatar.reset();
}

function handleImageFormSubmit(evt,name,link,alt) {
  evt.preventDefault();
  name = formNewPlaceName.value;
  link = formNewPlaceLink.value;
  alt = formNewPlaceAlt.value;
  const newCard = createCard(name, link, alt, deleteCard, toggleLikeState, openImagePopup);
  placesList.prepend(newCard);
  formNewPlace.reset();
  closePopup(popupAddCard);
}

function openPopupProfile(){
  const buttonElement = document.querySelector(validationSettings.submitButtonSelector);
  buttonElement.classList.remove('popup__button_disabled');
  buttonElement.disabled = false;
  clearValidation(popupProfile, validationSettings);
  inputJob.value = profileDescription.textContent;
  inputName.value = profileTitle.textContent;
  openPopup(popupProfile);
}

function openPopupAddCard(){
  enableValidation(validationSettings);
  openPopup(popupAddCard);
}

function openPopupNewAvatar() {
  openPopup(popupEditAvatar);
}

export function openImagePopup(evt){
  popupFullImage.querySelector('.popup__image').src = evt.target.src;
  popupFullImage.querySelector('.popup__image').alt = evt.target.alt;
  popupFullImage.querySelector('.popup__caption').textContent = evt.target.alt;
  openPopup(popupFullImage);
}

function renderLoading(popup, isLoading) {
  const buttonElement = popup.querySelector('.popup__button');
  if(isLoading) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить';
  }
}

buttonsPopupClose.forEach((el) => {
  el.addEventListener('click', () => closePopup(el.closest('.popup')));
});

buttonOpenFormProfile.addEventListener('click', openPopupProfile);
buttonOpenAddCard.addEventListener('click', openPopupAddCard);
profileImage.addEventListener('click', openPopupNewAvatar);

formEditProfile.addEventListener('submit', function() {
  renderLoading(popupProfile, true);
  const profileData = {
    name: inputName.value,
    about: inputJob.value
  }
  editProfileData(profileData)
  .finally(()=> {
    renderLoading(popupProfile, false);
  })
});

formNewPlace.addEventListener('submit', function() {
  renderLoading(popupAddCard, true);
  const newCardData = {
    name: formNewPlaceName.value,
    link: formNewPlaceLink.value
  }
  addNewCard(newCardData)
  .finally(()=>{
    renderLoading(popupAddCard, false);
  })
});

formEditAvatar.addEventListener('submit', function() {
  renderLoading(popupEditAvatar, true);
  const newAvatarUrl = {
    avatar: avatarNewLink.value
  }
  editAvatar(newAvatarUrl)
  .finally(()=>{
    renderLoading(popupEditAvatar, false);
  })
});

formEditProfile.addEventListener('submit', handleEditFormSubmit);
formNewPlace.addEventListener('submit',handleImageFormSubmit);
formEditAvatar.addEventListener('submit', handleAvatarFormSubmit)
popupProfile.addEventListener('click', overlayListener);
popupAddCard.addEventListener('click', overlayListener);
popupFullImage.addEventListener('click', overlayListener);

getAvatarInfo()
  .then((res) => {
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about;
    profileImage.style.backgroundImage = `url(${res.avatar})`;
  })
  .catch(err => {
    console.log(err);
  });

getInitialCards()
  .then((res) => {
    res.forEach((el) => {
      placesList.append(createCard(el.name, el.link, el.name, deleteCard, toggleLikeState, openImagePopup, el.likes.length, el.owner._id,'69f92e919622af980323ffac', el._id, el.isLiked));
    })
  })
  .catch(err => {
    console.log(err);
  });

getLikesCount()
  .catch(err => {
    console.log(err);
  });
