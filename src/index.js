import './styles/index.css';
import {deleteCard, createCard, likeCard} from './scripts/components/card.js';
import {openPopup, closePopup, overlayListener} from './scripts/components/modal.js';
import {validationSettings, enableValidation, clearValidation, enableSubmitButton, disableSubmitButton} from './scripts/components/validation.js'
import {getUserInfo, getInitialCards, editProfileData, addNewCard, editAvatar, setLike, removeLike} from './scripts/components/api.js'
import {renderLoading} from './scripts/components/utils.js'

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
const popupImage = popupFullImage.querySelector('.popup__image');
const popupCaption = popupFullImage.querySelector('.popup__caption');

const avatarNewLink = formEditAvatar.querySelector('.popup__input_type_url');

let userId;

enableValidation(validationSettings);

function handleEditFormSubmit() {
  profileTitle.textContent = inputName.value;
  profileDescription.textContent = inputJob.value;
  closePopup(popupProfile);
}

function handleAvatarFormSubmit() {
  profileImage.style.backgroundImage = `url('${avatarNewLink.value}')`;
  closePopup(popupEditAvatar);
  disableSubmitButton(popupEditAvatar, validationSettings);
  formEditAvatar.reset();
}

function handleImageFormSubmit() {
  renderLoading(popupAddCard, true);
  const cardData = {
    name: formNewPlaceName.value,
    link: formNewPlaceLink.value
  };

  addNewCard(cardData)
    .then((serverCard) => {
      const cardElement = createCard(
        serverCard,
        deleteCard,
        setLike,
        removeLike,
        likeCard,
        openImagePopup,
        userId
      );

      placesList.prepend(cardElement);
      formNewPlace.reset();
      clearValidation(popupAddCard, validationSettings);
      disableSubmitButton(popupAddCard, validationSettings);
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log('Ошибка создания карточки:', err);
    })
    .finally(()=>{
      renderLoading(popupAddCard, false);
    })
}

function openPopupProfile(){
  enableSubmitButton(popupProfile, validationSettings);
  clearValidation(popupProfile, validationSettings);
  inputJob.value = profileDescription.textContent;
  inputName.value = profileTitle.textContent;
  openPopup(popupProfile);
}

function openPopupAddCard(){
  openPopup(popupAddCard);
}

function openPopupNewAvatar() {
  openPopup(popupEditAvatar);
}

export function openImagePopup(evt){
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;
  openPopup(popupFullImage);
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
  .then(()=> {
    handleEditFormSubmit();
  })
  .finally(()=> {
    renderLoading(popupProfile, false);
  })
});

formNewPlace.addEventListener('submit', handleImageFormSubmit);

formEditAvatar.addEventListener('submit', function() {
  renderLoading(popupEditAvatar, true);
  const newAvatarUrl = {
    avatar: avatarNewLink.value
  }
  editAvatar(newAvatarUrl)
  .then (() => {
    handleAvatarFormSubmit();
  })
  .finally(()=>{
    renderLoading(popupEditAvatar, false);
  })
});

popupProfile.addEventListener('click', overlayListener);
popupAddCard.addEventListener('click', overlayListener);
popupFullImage.addEventListener('click', overlayListener);
popupEditAvatar.addEventListener('click', overlayListener);

getUserInfo()
  .then((res) => {
    profileTitle.textContent = res.name;
    profileDescription.textContent = res.about;
    profileImage.style.backgroundImage = `url(${res.avatar})`;

    return res;
  })
  .then ((userData) => {
    userId = userData._id;
    getInitialCards()
    .then((cards) =>{
      cards.forEach((card) => {
        placesList.append(createCard(
          card,
          deleteCard,
          setLike,
          removeLike,
          likeCard,
          openImagePopup,
          userData._id
        ));
      })
    })
    .catch(err => {
      console.log(err);
    })
  })
  .catch(err => {
    console.log(err);
  });
