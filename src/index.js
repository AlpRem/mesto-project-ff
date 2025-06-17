import './pages/index.css';
import {initialCards, createCard, deleteCard, likeCard} from './components/card';
import {openPopup, closePopup, submitEditProfileForm, submitAddCardForm} from './components/modal';

const placeCardListUl = document.querySelector('.places__list');
const editModalBtn = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const addModalBtn = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const profileModalForm = popupTypeEdit.querySelector('.popup__form');
const cardModalForm = popupTypeNewCard.querySelector('.popup__form');

// @todo: Вывод всех карточек
initialCards.forEach((card) => placeCardListUl.append(createCard(card, deleteCard, likeCard)));

// @todo: Слушатель клика по кнопки редактирования профиля
editModalBtn.addEventListener('click', () => {
    popupTypeEdit.querySelector('.popup__input_type_name').value =
        document.querySelector('.profile__title').textContent;
    popupTypeEdit.querySelector('.popup__input_type_description').value =
        document.querySelector('.profile__description').textContent;
    openPopup(popupTypeEdit);
});

// @todo: Слушатель клика по кнопки добавления карточки
addModalBtn.addEventListener('click', () => {
    openPopup(popupTypeNewCard);
})

// @todo: Слушатель клика по картинке карточки
placeCardListUl.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('card__image')) {
        const card = evt.target.closest('.card');
        const cardTitle = card.querySelector('.card__title');
        const image = popupTypeImage.querySelector('.popup__image');
        const caption = popupTypeImage.querySelector('.popup__caption');

        image.src = evt.target.src;
        image.alt = evt.target.alt;
        caption.textContent = cardTitle.textContent;
        openPopup(popupTypeImage);
    }
});

// @todo: Функция отправки данных окна редактирования профиля
profileModalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    document.querySelector('.profile__title').textContent =
        profileModalForm.querySelector('.popup__input_type_name').value;
    document.querySelector('.profile__description').textContent =
        profileModalForm.querySelector('.popup__input_type_description').value;
    closePopup(popupTypeEdit);
});


// @todo: Функция отправки данных окна добавления новой карточки
cardModalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const nameInput = popupTypeNewCard.querySelector('.popup__input_type_card-name');
    const linkInput = popupTypeNewCard.querySelector('.popup__input_type_url');
    placeCardListUl.prepend(createCard({
        name: nameInput.value,
        link: linkInput.value
        },deleteCard, likeCard));
    cardModalForm.reset();
    closePopup(cardModalForm);
});

[popupTypeEdit, popupTypeNewCard, popupTypeImage].forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup || evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    });
});