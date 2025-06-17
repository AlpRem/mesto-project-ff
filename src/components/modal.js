export function openPopup(modalBtn, popup, callback = null) {
    modalBtn.addEventListener('click', (evt) => {
        clearPopupFields(popup);
        if (callback && typeof callback === 'function') {
            callback(popup);
        }
        toggleVisiblePopup(popup, true);
    });
}

export function closePopup(popup) {
    popup.addEventListener('click', (evt) => {
        if (evt.target === popup || evt.target.classList.contains('popup__close')) {
            toggleVisiblePopup(popup, false);
        }
    });
}

function clearPopupFields(popup) {
    const inputs = popup.querySelectorAll('input, textarea');
    inputs.forEach(input => input.value = '');
}

function toggleVisiblePopup(popup, isOpen) {
    if (!isOpen){
        popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', closePopupByKey);
    } else {
        popup.classList.add('popup_is-opened');
        document.addEventListener('keydown', closePopupByKey);
    }
}

function closePopupByKey(evt) {
    if (evt.key === 'Escape') {
        const isOpenPopup = document.querySelector('.popup_is-opened');
        if (isOpenPopup) toggleVisiblePopup(isOpenPopup, false);
    }
}
