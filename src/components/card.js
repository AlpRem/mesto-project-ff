// @todo: Темплейт карточки
import {openPopup} from "./modal";
import {apiLikeCard, likeNotCard} from "./api";
import {getCurrentUser} from "./state";

const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(card, deleteCardFn, likeCardFn, openImageFn) {
    const cardTemplateCopy = getCardTemplate();
    const cardImage = cardTemplateCopy.querySelector('.card__image');
    const cardTitle = cardTemplateCopy.querySelector('.card__title');
    const cardButtonDelete = cardTemplateCopy.querySelector('.card__delete-button');
    const cardLikeButton = cardTemplateCopy.querySelector('.card__like-button');
    const cardLikeCount = cardTemplateCopy.querySelector('.card__like-count');
    const cardIconDelete = cardTemplateCopy.querySelector('.card__delete-button');
    const user = getCurrentUser();
    cardTemplateCopy.dataset.cardId = card.id;
    cardImage.src = card.link;
    cardImage.alt = card.name;
    cardTitle.textContent = card.name;
    if (card.likes!==undefined && card.likes.length > 0)
        cardLikeCount.textContent = card.likes.length;
    if (card.owner === undefined || card.owner.id === undefined || user._id !== card.owner.id)
        cardIconDelete.classList.add('card__delete-button-disible');
    cardButtonDelete.addEventListener('click', deleteCardFn);
    cardLikeButton.addEventListener('click', likeCardFn);
    cardImage.addEventListener('click', openImageFn);

    if (card.likes!==undefined)
        card.likes.forEach(like => {
            if (like.id === user.id)
                cardLikeButton.classList.add('card__like-button_is-active');
    })
    return cardTemplateCopy;
}

function getCardTemplate(){
    return cardTemplate.querySelector('.card').cloneNode(true);
}

// @todo: Функция удаления карточки
export function deleteCard(id, popup) {
    popup.dataset.cardId = id;
    openPopup(popup);
}

// @todo: Функция установки/удаления сердечка (лайка)
export function likeCard(id, likes, event) {
    const isLike = event.target.classList.toggle('card__like-button_is-active');
    const likeCountElement = event.currentTarget.closest('.card').querySelector('.card__like-count');
    if (isLike) {
        apiLikeCard(id)
            .then((data) => {
                likeCountElement.textContent = data.likes.length || 0;
            })
    } else {
        likeNotCard(id)
            .then((data) => {
                if (likes!==undefined ||data.likes.length === 0) {
                    likeCountElement.textContent = '';
                } else {
                    likeCountElement.textContent = data.likes.length || 0;
                }
            })
    }
}