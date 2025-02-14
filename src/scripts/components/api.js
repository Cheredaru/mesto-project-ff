const token = 'c62ee91c-663d-44ac-9123-e6fc19e0e5f6';
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',
  headers: {
    authorization: 'c62ee91c-663d-44ac-9123-e6fc19e0e5f6',
    'Content-Type': 'application/json'
  }
}

const checkStatus = (res) =>{
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res)=>{
    return checkStatus(res);
  })
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`,{
    headers: config.headers
  })
  .then((res)=>{
    return checkStatus(res);
  })
}

export const editProfileData = (profileData) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(profileData)
  })
  .then((res)=>{
    return checkStatus(res);
  })
}

export const addNewCard = (cardData) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(cardData),
  })
  .then((res)=>{
    return checkStatus(res);
  })
}

export const deleteCardFromAPI = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`,{
    method: 'DELETE',
    headers: config.headers,
  })
  .then((res)=>{
    return checkStatus(res);
  })
}

export const editAvatar = (newAvatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(newAvatarUrl),
  })
  .then((res)=>{
    return checkStatus(res);
  })
}

export const setLike = (cardId) =>{
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then((res)=>{
    return checkStatus(res);
  })
  .then((data) => {
    return data;
  })
  .catch((err) =>{
    console.log('Ошибка при постановке лайка:', err);
    throw err;
  })
}

export const removeLike = (cardId) =>{
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then((res)=>{
    return checkStatus(res);
  })
  .then((data) => {
    return data;
  })
  .catch((err) => {
    console.log('Ошибка при снятии лайка:', err);
    throw err;
  });
}
