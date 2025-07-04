import './pages/index.css';
import {createCard, deleteCard, likeCard} from './components/card';
import {initialCards} from './components/cards';
import {openPopup, closePopup, openImagePopup} from './components/modal';
import {clearValidation, enableValidation} from "./components/validation";
import {addCard, apiDeleteCard, editImageProfile, editProfile, getCards, getProfile} from "./components/api";

const placeCardListUl = document.querySelector('.places__list');
const editModalBtn = document.querySelector('.profile__edit-button');
const popupTypeEdit = document.querySelector('.popup_type_edit');
const addModalBtn = document.querySelector('.profile__add-button');
const profileImageBtn = document.querySelector('.profile__image');
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupTypeImage = document.querySelector('.popup_type_image');
const popupDelete = document.querySelector('.popup_confirmation_delete');
const popupProfileImage = document.querySelector('.popup_profile_image');
const profileModalForm = popupTypeEdit.querySelector('.popup__form');
const profileImageModalForm = popupProfileImage.querySelector('.popup__form');
const cardModalForm = popupTypeNewCard.querySelector('.popup__form');
const cardDeleteModalForm = popupDelete.querySelector('.popup__form');

const popupNameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const profileTitle = document.querySelector('.profile__title');
const popupDescriptionInput = popupTypeEdit.querySelector('.popup__input_type_description');
const profileDescription = document.querySelector('.profile__description');

const nameInput = popupTypeNewCard.querySelector('.popup__input_type_card-name');
const linkInput = popupTypeNewCard.querySelector('.popup__input_type_url');
const linkAvatarInput = popupProfileImage.querySelector('.popup__input_type_url');
const profileImage = document.querySelector('.profile__image');

let _idProfile = '';
// todo Конфигурация валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

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

profileImageBtn.addEventListener('click', () => {
    profileImageModalForm.reset();
    clearValidation(profileImageModalForm, validationConfig);
    openPopup(popupProfileImage);
})

// @todo: Функция отправки данных окна редактирования профиля
profileModalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    profileTitle.textContent = popupNameInput.value;
    profileDescription.textContent = popupDescriptionInput.value;
    const btn = popupTypeNewCard.querySelector('.popup__button');
    btn.textContent = 'Сохранение...';
    editProfile({
        title: popupNameInput.value,
        description: popupDescriptionInput.value
    })
        .then((data)=>{
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
    })
        .catch((err) => {
            console.error("Ошибка при сохранение профиля:", err);
        })
        .finally(() => {
            btn.textContent = 'Сохранение';
            closePopup(popupTypeEdit);
        });
});

// @todo: Функция отправки данных окна добавления новой карточки
cardModalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const btn = popupTypeNewCard.querySelector('.popup__button');
    btn.textContent = 'Сохранение...';
    addCard({
        name: nameInput.value,
        link: linkInput.value,
        owner: {
            id: _idProfile
        }
    })
        .then((data)=>{
            placeCardListUl.prepend(createCard(_idProfile,{
                name: data.name,
                link: data.link,
            },(event) => deleteCard(data, event),
                (event) => likeCard(data, event),
                openImagePopup));
        })
        .catch((err) => {
            console.error("Ошибка при сохранение карточки:", err);
        })
        .finally(() => {
            btn.textContent = 'Сохранение';
            cardModalForm.reset();
            clearValidation(cardModalForm, validationConfig);
            closePopup(popupTypeNewCard);
        });

});

// @todo: Функция удаления карточки через попап
cardDeleteModalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const cardId = popupDelete.dataset.cardId;
    apiDeleteCard(cardId)
         .then(() => {
             const cardToRemove = document.querySelector(`.card[data-card-id="${cardId}"]`);
             if (cardToRemove) {
                 cardToRemove.remove();
             }
         })
        .catch((err) => {
            console.error("Ошибка при удаление карточки:", err);
        })
        .finally(() => {
            closePopup(popupDelete);
        });
});

profileImageModalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const btn = popupTypeNewCard.querySelector('.popup__button');
    btn.textContent = 'Сохранение...';
    editImageProfile(linkAvatarInput.value)
        .then((data)=>{
            profileImage.style.backgroundImage = `url(${data.avatar})`;
        })        .catch((err) => {
        console.error("Ошибка при обновление аватара:", err);
    })
        .finally(() => {
            btn.textContent = 'Сохранение';
            closePopup(popupProfileImage);
        });
});

[popupTypeEdit, popupTypeNewCard, popupTypeImage, popupDelete, popupProfileImage].forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup || evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    });
});

// @todo: Включение валидации полей
enableValidation(validationConfig);

// @todo: Получаем данные о профиле
getProfile().then((data) => {
    _idProfile = data._id;
    profileTitle.textContent = data.name;
    profileDescription.textContent = data.about;
    profileImage.style.backgroundImage = `url(${data.avatar})`;
})

// @todo: Получаем списка карточек
getCards().then((data) => {
    const cards = data.map(card =>({
        id: card.id,
        name: card.name,
        link: card.link,
        likes: card.likes,
        owner: {
            id: card.owner._id,
            name: card.owner.name,
            about: card.owner.about,
            avatar: card.owner.avatar
        },
    }));
    placeCardListUl.innerHTML = '';
    cards.forEach(card => {
        placeCardListUl.append(createCard(_idProfile, card,
            (event) => deleteCard(card, popupDelete, event),
            (event) => likeCard(card, event), openImagePopup));
    })
})