// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(card, deleteCardFn, likeCardFn, openImageFn) {
    const cardTemplateCopy = getCardTemplate();
    const cardImage = cardTemplateCopy.querySelector('.card__image');
    const cardTitle = cardTemplateCopy.querySelector('.card__title');
    const cardButtonDelete = cardTemplateCopy.querySelector('.card__delete-button');
    const cardLikeButton = cardTemplateCopy.querySelector('.card__like-button');
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;
    cardButtonDelete.addEventListener('click', deleteCardFn);
    cardLikeButton.addEventListener('click', likeCardFn);
    cardImage.addEventListener('click', openImageFn);
    return cardTemplateCopy;
}

function getCardTemplate(){
    return cardTemplate.querySelector('.card').cloneNode(true);
}

// @todo: Функция удаления карточки
export function deleteCard(event) {
    event.target.closest('.card').remove();
}

// @todo: Функция установки/удаления сердечка (лайка)
export function likeCard(event) {
    event.target.classList.toggle('card__like-button_is-active');
}