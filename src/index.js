import './pages/index.css';
import {createCard, deleteCard, likeCard} from './components/card';
import {openPopup, closePopup} from './components/modal';
import {clearValidation, enableValidation} from "./components/validation";
import {addCard, apiDeleteCard, editImageProfile, editProfile, getCards, getProfile} from "./components/api";
import {getCurrentUser, setCurrentUser} from "./components/state";

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

const popupImage = document.querySelector('.popup_type_image');
const imageUrl = popupImage.querySelector('.popup__image');
const captionImage = popupImage.querySelector('.popup__caption');

const editProfileBtn = profileModalForm.querySelector('.popup__button');
const editImageProfileBtn = popupTypeNewCard.querySelector('.popup__button');
const addCardBtn = popupTypeNewCard.querySelector('.popup__button');


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

// @todo: Слушатель клика по кнопки изменения аватара профиля
profileImageBtn.addEventListener('click', () => {
    profileImageModalForm.reset();
    clearValidation(profileImageModalForm, validationConfig);
    openPopup(popupProfileImage);
})

// @todo: Функция отправки данных окна редактирования профиля
profileModalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderLoading(editProfileBtn, true);
    editProfile({
        title: popupNameInput.value,
        description: popupDescriptionInput.value
    })
        .then((data)=>{
            profileTitle.textContent = data.name;
            profileDescription.textContent = data.about;
            closePopup(popupTypeEdit);
    })
        .catch((err) => {
            console.error("Ошибка при сохранение профиля:", err);
        })
        .finally(() => {
            renderLoading(editProfileBtn, false);
        });
});

// @todo: Функция отправки данных окна добавления новой карточки
cardModalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderLoading(addCardBtn, true);
    const user = getCurrentUser();
    addCard({
        name: nameInput.value,
        link: linkInput.value
    })
        .then((data)=>{
            placeCardListUl.prepend(createCard({
                id: data._id,
                name: data.name,
                link: data.link,
                likes: data.likes,
                owner: {
                    id: user._id
                }
            },
                user._id,
                handleDeleteCard,
                (event) => likeCard(data._id, data.likes, event, event.currentTarget,
                    event.currentTarget.closest('.card').querySelector('.card__like-count')),
                (link, name) => openImagePopup(link, name)));
            cardModalForm.reset();
            clearValidation(cardModalForm, validationConfig);
            closePopup(popupTypeNewCard);
        })
        .catch((err) => {
            console.error("Ошибка при сохранение карточки:", err);
        })
        .finally(() => {
            renderLoading(addCardBtn, false);
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
             closePopup(popupDelete);
         })
        .catch((err) => {
            console.error("Ошибка при удаление карточки:", err);
        })
});

// @todo: Функция открытия модального окна с картинкой (попапа)
function openImagePopup(link, name) {
    imageUrl.src = link;
    imageUrl.alt = name;
    captionImage.textContent = name;
    openPopup(popupImage);
}

// @todo: Функция редактирования аватара профиля через попап
profileImageModalForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    renderLoading(editImageProfileBtn, true);
    editImageProfile(linkAvatarInput.value)
        .then((data)=>{
            profileImage.style.backgroundImage = `url(${data.avatar})`;
            closePopup(popupProfileImage);
        })
        .catch((err) => {
        console.error("Ошибка при обновление аватара:", err);
    })
        .finally(() => {
            renderLoading(editImageProfileBtn, false);
        });
});

// @todo: Слушатель клика по кнопки закрытия попапа
[popupTypeEdit, popupTypeNewCard, popupTypeImage, popupDelete, popupProfileImage].forEach((popup) => {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup || evt.target.classList.contains('popup__close')) {
            closePopup(popup);
        }
    });
});

// @todo: Включение валидации полей
enableValidation(validationConfig);

// @todo: Получаем начальных данные (профиля и карточек)
getProfile()
    .then((data) => {
        setCurrentUser(data);
        profileTitle.textContent = data.name;
        profileDescription.textContent = data.about;
        profileImage.style.backgroundImage = `url(${data.avatar})`;
        return getCards()
    .catch((err) => console.error('Ошибка загрузки профиля ', err));
})
    .then((data) => {
        const cards = data.map(card =>({
            id: card._id,
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
        cards.forEach(card => {
            placeCardListUl.append(createCard(card,
                getCurrentUser()._id,
                handleDeleteCard,
                (event) => likeCard(card.id, card.likes, event,
                    event.currentTarget, event.currentTarget.closest('.card').querySelector('.card__like-count')),
                (link, name) => openImagePopup(link, name)));
        })
            .catch((err) => {
                console.error('Ошибка загрузки карточек:', err);
            });
    })
    .catch((err) => console.error('Ошибка загрузки профиля ', err));

// @todo: Функция удаления карточки
function handleDeleteCard(event) {
    const cardElement = event.target.closest('.card');
    popupDelete.dataset.cardId = cardElement.dataset.cardId;
    openPopup(popupDelete);
}

// @todo: Функция изменения состояния текста кнопки в попап окнах
function renderLoading(buttonElement, isLoading, text = 'Сохранить', loadingText = 'Сохранение...') {
    buttonElement.disabled = isLoading;
    buttonElement.textContent = isLoading ? loadingText : text;
}