const token = 'c62ee91c-663d-44ac-9123-e6fc19e0e5f6';
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-31',
  headers: {
    authorization: 'c62ee91c-663d-44ac-9123-e6fc19e0e5f6',
    'Content-Type': 'application/json'
  }
}
export const getAvatarInfo = () => {
  return fetch(config.baseUrl + '/users/me', {
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const getInitialCards = () => {
  return fetch(config.baseUrl + '/cards',{
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const editProfileData = (profileData) => {
  return fetch(config.baseUrl + '/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(profileData)
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const addNewCard = (cardData) => {
  return fetch(config.baseUrl + '/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify(cardData),
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const getLikesCount = () => {
  return fetch(config.baseUrl + '/cards',{
    headers: config.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const deleteCardFromAPI = (cardId) => {
  return fetch(config.baseUrl + `/cards/${cardId}`,{
    method: 'DELETE',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const addLike = (cardId) => {
  return fetch(config.baseUrl + `/cards/likes/${cardId}`,{
    method: 'PUT',
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const likeCard = (cardId, isLiked) => {
  const method = isLiked ? 'DELETE' : 'PUT';

  return fetch(config.baseUrl + `/cards/likes/${cardId}`,{
    method: method,
    headers: config.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}

export const editAvatar = (newAvatarUrl) => {
  return fetch(config.baseUrl + `/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify(newAvatarUrl),
  })
  .then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
}
