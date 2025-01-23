export function openPopup(evt){
  if(evt.target.classList.contains("profile__edit-button")){
    const popup = document.querySelector(".popup_type_edit");
    popup.classList.add("popup_is-animated");
    popup.classList.add("popup_is-opened");
  } else if(evt.target.classList.contains("profile__add-button")) {
    const popup = document.querySelector(".popup_type_new-card");
    popup.classList.add("popup_is-animated");
    popup.classList.add("popup_is-opened");
  } else if(evt.target.classList.contains("card__image")){
    const popup = document.querySelector(".popup_type_image");
    popup.querySelector('.popup__image').src = evt.target.src;
    popup.querySelector('.popup__image').alt = evt.target.alt;
    popup.querySelector('.popup__caption').textContent = evt.target.alt;
    popup.classList.add("popup_is-animated");
    popup.classList.add("popup_is-opened");
  }
}

export function closePopup(evt){
  const popup = document.querySelector(".popup_is-opened");
  if(evt.target.classList.contains("popup") || evt.target.classList.contains("popup__close") || evt.key === "Escape"){
    popup.classList.remove("popup_is-opened");
  }
}
