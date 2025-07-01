import './pages/index.css';
import {createCard, deleteCard, likeCard} from './components/card';
import {initialCards} from './components/cards';
import {openPopup, closePopup, openImagePopup} from './components/modal';
import {clearValidation, enableValidation} from "./components/validation";

const placeCardListUl = document.querySelector('.places__list');
const editModalBtn = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const addModalBtn = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const profileModalForm = popupTypeEdit.querySelector('.popup__form');
const cardModalForm = popupTypeNewCard.querySelector('.popup__form');

const popupNameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const profileTitle = document.querySelector('.profile__title');
const popupDescriptionInput = popupTypeEdit.querySelector('.popup__input_type_description');
const profileDescription = document.querySelector('.profile__description');

const nameInput = popupTypeNewCard.querySelector('.popup__input_type_card-name');
const linkInput = popupTypeNewCard.querySelector('.popup__input_type_url');

// todo Конфигурация валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// @todo: Вывод всех карточек
initialCards.forEach((card) => placeCardListUl.append(createCard(card, deleteCard, likeCard, openImagePopup)));

// @todo: Слушатель клика по кнопки редактирования профиля
editModalBtn.addEventListener('click', () => {
    popupNameInput.value = profileTitle.textContent;
    popupDescriptionInput.value = profileDescription.textContent;
    clearValidation(profileModalForm, validationConfig);
    openPopup(popupTypeEdit);
});

// @todo: Слушатель клика по кнопки добавления карточки
addModalBtn.addEventListener('click', () => {
    cardModalForm.reset();
    clearValidation(cardModalForm, validationConfig);
    openPopup(popupTypeNewCard);
})

// @todo: Функция отправки данных окна редактирования профиля
profileModalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileTitle.textContent = popupNameInput.value;
    profileDescription.textContent = popupDescriptionInput.value;
    closePopup(popupTypeEdit);
});

// @todo: Функция отправки данных окна добавления новой карточки
cardModalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    placeCardListUl.prepend(createCard({
        name: nameInput.value,
        link: linkInput.value
        },deleteCard, likeCard, openImagePopup));
    cardModalForm.reset();
    clearValidation(cardModalForm, validationConfig);
    closePopup(popupTypeNewCard);
});

[popupTypeEdit, popupTypeNewCard, popupTypeImage].forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup || evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    });
});

enableValidation(validationConfig);