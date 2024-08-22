const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

initialCards.forEach((el) => {
  placesList.append(createCard(el.name, el.link, el.alt, deleteCard));
})

function createCard(name, link, alt, deleteCard) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = placesItem.querySelector('.card__delete-button');

  placesItem.querySelector('.card__image').src = link;
  placesItem.querySelector('.card__image').alt = alt;
  placesItem.querySelector('.card__title').textContent = name;

  deleteButton.addEventListener('click', deleteCard);
  return placesItem;
}

function deleteCard(evt) {
  const placesItem = evt.target.closest('.places__item');
  placesItem.remove();
}
