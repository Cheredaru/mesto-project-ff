import { deleteCardFromAPI } from "./api";
const cardTemplate = document.querySelector('#card-template').content;

export const deleteCard = (evt, cardId) => {
  deleteCardFromAPI(cardId)
    .then(() => {
      const cardElement = evt.target.closest('.places__item');
      if (cardElement) {
        cardElement.remove();
      }

    })
    .catch((err) => {
      console.log('Ошибка при удалении карточки:', err);
    })
}

export function createCard(cardData, deleteCard, setLike, removeLike, likeCard, openImagePopup, userId) {
  const placesItem = cardTemplate.querySelector('.places__item').cloneNode(true);
  const deleteButton = placesItem.querySelector('.card__delete-button');
  const likeButton = placesItem.querySelector('.card__like-button');
  const cardImage = placesItem.querySelector('.card__image');
  const cardTitle = placesItem.querySelector('.card__title')
  const likeCount = placesItem.querySelector('.card__like-count');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  if (cardData.likes.some(like => like._id === userId)){
    likeButton.classList.add('card__like-button_is-active');
  }

  if(cardData.owner._id !== userId) {
    deleteButton.style.display = 'none';
  } else {
    deleteButton.addEventListener('click', (evt) => {
      deleteCard(evt, cardData._id);
    })
  }

  likeButton.addEventListener('click', () =>{
    likeCard(cardData._id, likeButton, likeCount, setLike, removeLike);
  });

  cardImage.addEventListener('click', openImagePopup);
  placesItem.dataset.cardId = cardData._id;
  return placesItem;
}

export const likeCard = (cardId, likeButton, likeCount, setLike, removeLike) => {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
    if (isLiked) {
      removeLike(cardId)
        .then(updatedCard => {
          likeButton.classList.remove('card__like-button_is-active');
          likeCount.textContent = updatedCard.likes.length;
        })
    } else{
      setLike(cardId)
        .then(updatedCard => {
          likeButton.classList.add('card__like-button_is-active');
          likeCount.textContent = updatedCard.likes.length;
        })
    }
}
