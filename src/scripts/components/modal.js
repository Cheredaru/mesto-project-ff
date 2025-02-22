export function openPopup(popup){
  popup.classList.add('popup_is-animated');
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeEscPopup);
}

export function closePopup(popup){
  popup.classList.remove('popup_is-opened');
  popup.classList.remove('popup_is-animated');
  document.removeEventListener('keydown', closeEscPopup);
}

export function closeEscPopup(evt){
  if(evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_is-opened'));
  }
}

export function overlayListener(evt){
  if(evt.target.classList.contains('popup')){
    closePopup(evt.target);
  }
}
