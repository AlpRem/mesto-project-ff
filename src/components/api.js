const config =  {
    url: 'https://nomoreparties.co/v1/wff-cohort-42',
    headers: {
        authorization: 'e9f1a4a8-3394-4c77-b24a-f38f53566cda',
        'Content-Type': 'application/json'
    }
}

// @todo: Get-запрос на получение данных о профиле
export function getProfile() {
    return fetch(`${config.url}/users/me`, {
        headers: config.headers
        })
        .then((res) => res.json())
        .catch((err) => console.error('Ошибка загрузки профиля ', err));
}

// @todo: Get-запрос на получение списка карточек
export function getCards() {
    return fetch(`${config.url}/cards`, {
        headers: config.headers
    })
        .then((res) => res.json())
        .catch((err) => console.error('Ошибка загрузки карточек ', err));
}

// @todo: Patch-запрос на редактирование данных о профиле
export function editProfile(profile) {
    return fetch(`${config.url}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: profile.title,
            about: profile.description
        })
    })
        .then((res) =>  res.json())
        .catch((err) => console.error('Ошибка запроса редактирования профиля ', err));
}

// @todo: Patch-запрос на редактирование данных о профиле
export function editImageProfile(urlImage) {
    return fetch(`${config.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: urlImage
        })
    })
        .then((res) =>  res.json())
        .catch((err) => console.error('Ошибка запроса редактирования профиля ', err));
}

// @todo: Post-запрос на добавление новой карты
export function addCard(card) {
    return fetch(`${config.url}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: card.name,
            link: card.link
        })
    })
        .then((res) =>  res.json())
        .catch((err) => console.error('Ошибка запроса добавления карты ', err));
}

// @todo: Delete-запрос на удаление карты
export function apiDeleteCard(cardId) {
    return fetch(`${config.url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then((res) =>  res.json())
        .catch((err) => console.error('Ошибка запроса удаления карты ', err));
}

// @todo: Put-запрос на лайк карты
export function apiLikeCard(cardId) {
    return fetch(`${config.url}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: config.headers
    })
        .then((res) =>  res.json())
        .catch((err) => console.error('Ошибка запроса лайка карты ', err));
}

// @todo: Delete-запрос на удаление лайка карты
export function likeNotCard(cardId) {
    return fetch(`${config.url}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
        .then((res) =>  res.json())
        .catch((err) => console.error('Ошибка запроса удаления лайка карты ', err));
}