import './styles/index.css';
import {initialCards} from './scripts/cards.js';
import {deleteCard, likeCard, createCard} from './scripts/components/card.js';
import {openPopup, closePopup} from './scripts/components/modal.js';

const placesList = document.querySelector('.places__list');

initialCards.forEach((el) => {
  placesList.append(createCard(el.name, el.link, el.alt, deleteCard,likeCard));
})

const formEdit = document.forms.edit_profile;
formEdit.elements.name.value = document.querySelector(".profile__title").textContent;
formEdit.elements.description.value = document.querySelector(".profile__description").textContent;

document.addEventListener('click', openPopup);
document.addEventListener('click', closePopup);
document.addEventListener('keydown', closePopup);

const formElement = document.querySelector(".popup__form");
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");


function handleFormSubmit(evt) {
  evt.preventDefault();
  const popup = document.querySelector(".popup_is-opened");
  profileTitle.textContent = nameInput.value;
  profileDesc.textContent = jobInput.value;
  popup.classList.remove("popup_is-opened");
}

formElement.addEventListener("submit", handleFormSubmit);
const formNewPlace = document.forms[1];

formNewPlace.addEventListener('submit', function(evt){
  evt.preventDefault();
  const popup = document.querySelector(".popup_is-opened")
  const placeName = formNewPlace.querySelector(".popup__input_type_card-name").value;
  const placeLink = formNewPlace.querySelector(".popup__input_type_url").value;
  placesList.prepend(createCard(placeName, placeLink, placeName, deleteCard,likeCard));
  formNewPlace.reset();
  popup.classList.remove("popup_is-opened");
});
