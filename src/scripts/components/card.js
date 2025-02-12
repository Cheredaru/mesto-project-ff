import { deleteCardFromAPI, likeCard } from "./api";

export function deleteCard(evt) {
  const placesItem = evt.target.closest('.places__item');
  placesItem.remove();
}

export function toggleLikeState(evt){
  if(evt.target.classList.contains('card__like-button')){
    evt.target.classList.toggle('card__like-button_is-active');
    if(evt.target.classList.contains('card__like-button_is-active')){
      parseInt(evt.target.nextElementSibling.textContent++);
    } else{
      parseInt(evt.target.nextElementSibling.textContent--);
    }
  }
}

export function createCard(name, link, alt, deleteCard, toggleLikeState, openImagePopup, likes, ownerId, myId, cardId, isLiked) {
  const cardTemplate = document.querySelector('#card-template').content;
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = placesItem.querySelector('.card__delete-button');
  const likeButton = placesItem.querySelector('.card__like-button');
  const cardImage = placesItem.querySelector('.card__image');
  const likeCount = placesItem.querySelector('.card__like-count');

  placesItem.querySelector('.card__image').src = link;
  placesItem.querySelector('.card__image').alt = alt;
  placesItem.querySelector('.card__title').textContent = name;
  deleteButton.addEventListener('click', deleteCard);

  if(ownerId !== myId) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', () => {
      deleteCardFromAPI(cardId);
    })
  }
  if(isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click', toggleLikeState);
  likeButton.addEventListener('click', () => {
    likeCard(cardId, isLiked);
  });
  cardImage.addEventListener('click', openImagePopup);
  likeCount.textContent = likes;

  return placesItem;
}
