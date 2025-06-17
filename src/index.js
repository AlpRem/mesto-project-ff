import './pages/index.css';
import {initialCards, createCard, deleteCard, likeCard} from './components/card';
import {openPopup, closePopup, submitEditProfileForm, submitAddCardForm} from './components/modal';

const placeCardListUl = document.querySelector('.places__list');
const editModalBtn = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const addModalBtn = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');


// @todo: Вывод всех карточек
initialCards.forEach((card) => placeCardListUl.append(createCard(card, deleteCard, likeCard)));

openPopup(editModalBtn, popupTypeEdit, (popup) => {
    popup.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent;
    popup.querySelector('.popup__input_type_description').value = document.querySelector('.profile__description').textContent;
});
openPopup(addModalBtn, popupTypeNewCard);
openPopup(placeCardListUl, popupTypeImage);

closePopup(popupTypeEdit);
closePopup(popupTypeNewCard);
closePopup(popupTypeImage);

submitEditProfileForm(popupTypeEdit);
submitAddCardForm(popupTypeNewCard, (card) => {
    placeCardListUl.prepend(createCard(card, deleteCard, likeCard));
});