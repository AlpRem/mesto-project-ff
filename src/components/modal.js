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

// @todo: Служебная функция закрытия модального окна (попапа) при нажитие клавиши Esc
function closePopupByKey(evt) {
    if (evt.key === 'Escape') {
        const isOpenPopup = document.querySelector('.popup_is-opened');
        if (isOpenPopup) closePopup(isOpenPopup);
    }
}
