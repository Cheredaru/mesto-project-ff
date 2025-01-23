export function deleteCard(evt) {
  const placesItem = evt.target.closest('.places__item');
  placesItem.remove();
}

export function likeCard(evt){
  if(evt.target.classList.contains('card__like-button')){
    evt.target.classList.toggle('card__like-button_is-active');
  }
}

const cardTemplate = document.querySelector('#card-template').content;
export function createCard(name, link, alt, deleteCard,likeCard) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = placesItem.querySelector('.card__delete-button');
  const likeButton = placesItem.querySelector('.card__like-button');

  placesItem.querySelector('.card__image').src = link;
  placesItem.querySelector('.card__image').alt = alt;
  placesItem.querySelector('.card__title').textContent = name;

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);
  return placesItem;
}
