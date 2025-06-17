import './pages/index.css';
import {initialCards} from './components/dataBase';
import {createCard, deleteCard} from './components/card';
import {openPopup, closePopup} from './components/modal';

const placeCardListUl = document.querySelector('.places__list');
const editModalBtn = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const addModalBtn = document.querySelector('.profile__add-button');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');



initialCards.forEach((card) => placeCardListUl.append(createCard(card, deleteCard)));


openPopup(editModalBtn, popupTypeEdit, (popup) => {
    popup.querySelector('.popup__input_type_name').value = document.querySelector('.profile__title').textContent;
    popup.querySelector('.popup__input_type_description').value = document.querySelector('.profile__description').textContent;
});
openPopup(addModalBtn, popupTypeNewCard);

closePopup(popupTypeEdit);
closePopup(popupTypeNewCard);


placeCardListUl.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('card__image')) {
        popupTypeImage.classList.toggle('popup_is-opened');
    }
})

popupTypeImage.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup__close')) {
        popupTypeImage.classList.remove('popup_is-opened');
    }
});