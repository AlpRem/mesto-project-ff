// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placeCardListUl = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, deleteCardFn) {
        const cardTemplateCopy = cardTemplate.querySelector('.card').cloneNode(true);
        const cardImage = cardTemplateCopy.querySelector('.card__image');
        const cardTitle = cardTemplateCopy.querySelector('.card__title');
        const cardButtonDelete = cardTemplateCopy.querySelector('.card__delete-button');
        cardImage.src = card.link;
        cardImage.alt = card.name;
        cardTitle.textContent = card.name;
        cardButtonDelete.addEventListener('click', deleteCardFn);
        return cardTemplateCopy;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
        event.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => placeCardListUl.append(createCard(card, deleteCard)));