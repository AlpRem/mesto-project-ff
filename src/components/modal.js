// @todo: Функция открытия модального окна (попапа)
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', closePopupByKey)
}

// @todo: Функция закрытия модального окна (попапа)
export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closePopupByKey);
}

// @todo: Функция открытия модального окна с картинкой (попапа)
export function openImagePopup(evt) {
    const card = evt.target.closest('.card');
    const cardTitle = card.querySelector('.card__title');
    const image = document.querySelector('.popup_type_image .popup__image');
    const caption = document.querySelector('.popup_type_image .popup__caption');
    image.src = evt.target.src;
    image.alt = evt.target.alt;
    caption.textContent = cardTitle.textContent;
    openPopup(document.querySelector('.popup_type_image'));
}

// @todo: Служебная функция закрытия модального окна (попапа) при нажитие клавиши Esc
function closePopupByKey(evt) {
    if (evt.key === 'Escape') {
        const isOpenPopup = document.querySelector('.popup_is-opened');
        if (isOpenPopup) closePopup(isOpenPopup);
    }
}
