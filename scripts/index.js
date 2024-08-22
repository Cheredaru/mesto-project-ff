const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

initialCards.forEach((el) => {
  placesList.append(createCard(el.name, el.link, deleteCard));
})

function createCard(name, link, deleteCard) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = placesItem.querySelector('.card__delete-button');

  placesItem.querySelector('.card__image').src = link;
  placesItem.querySelector('.card__title').textContent = name;

  deleteButton.addEventListener('click', deleteCard);
  return placesItem;
}

function deleteCard(evt) {
  const eventTarget = evt.target;
  const placesItem = eventTarget.closest('.places__item');
  placesItem.remove();
}
