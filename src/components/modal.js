// @todo: Функция открытия модального окна (попапа)
export function openPopup(modalBtn, popup, callback = null) {
    modalBtn.addEventListener('click', (evt) => {
        clearPopupFields(popup);
        if (evt.target.classList.contains('card__image')) {
            const card = evt.target.closest('.card');
            const cardTitle = card.querySelector('.card__title');
            const image = popup.querySelector('.popup__image');
            const caption = popup.querySelector('.popup__caption');

            image.src = evt.target.src;
            image.alt = evt.target.alt;
            caption.textContent = cardTitle.textContent;
        }

        if (callback && typeof callback === 'function') {
            callback(popup);
        }
        toggleVisiblePopup(popup, true);
    });
}

// @todo: Функция закрытия модального окна (попапа)
export function closePopup(popup) {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup || evt.target.classList.contains('popup__close')) {
            toggleVisiblePopup(popup, false);
        }
    });
}


// @todo: Функция отправки данных окна редактирования профиля
export function submitEditProfileForm(popup) {
    const form = popup.querySelector('.popup__form[name="edit-profile"]');
    const nameInput = form.querySelector('.popup__input_type_name');
    const descriptionInput = form.querySelector('.popup__input_type_description');
    const profileTitle = document.querySelector('.profile__title');
    const profileDescription = document.querySelector('.profile__description');

    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        profileTitle.textContent = nameInput.value;
        profileDescription.textContent = descriptionInput.value;
        toggleVisiblePopup(popup, false);
    });
}

// @todo: Функция отправки данных окна добавления новой карточки
export function submitAddCardForm(popup, callback) {
    const form = popup.querySelector('.popup__form[name="new-place"]');
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const nameInput = form.querySelector('.popup__input_type_card-name');
        const linkInput = form.querySelector('.popup__input_type_url');

        const newCard = {
            name: nameInput.value,
            link: linkInput.value
        };
        callback(newCard);
        form.reset();
        toggleVisiblePopup(popup, false);
    });
}

// @todo: Служебная функция очистки полей модального окна (попапа)
function clearPopupFields(popup) {
    const inputs = popup.querySelectorAll('input, textarea');
    inputs.forEach(input => input.value = '');
}


// @todo: Служебная функция отвечающая за показ/скрытие модального окна (попапа)
function toggleVisiblePopup(popup, isOpen) {
    // popup.classList.add('popup_is-animated');
    if (!isOpen){
        popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', closePopupByKey);
    } else {
        popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', closePopupByKey);
    }
}


// @todo: Служебная функция закрытия модального окна (попапа) при нажитие клавиши Esc
function closePopupByKey(evt) {
    if (evt.key === 'Escape') {
        const isOpenPopup = document.querySelector('.popup_is-opened');
        if (isOpenPopup) toggleVisiblePopup(isOpenPopup, false);
    }
}
