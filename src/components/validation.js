// @todo: Функция валидации полей в форме
export function enableValidation(config) {
    const popupFormList = Array.from(document.querySelectorAll(config.formSelector));
    popupFormList.forEach((formElement) => {
        const popupInputInFormList = Array.from(formElement.querySelectorAll(config.inputSelector));
        const buttonElement = formElement.querySelector(config.submitButtonSelector);
        popupInputInFormList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                checkInputValidity(formElement, inputElement, config);
                toggleStateButton(popupInputInFormList, buttonElement, config);
            });
        });
    });
}

// @todo: Функция очистка полей ошибок валидации
export function clearValidation(form, config) {
    const inputList = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonElement = form.querySelector(config.submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.setCustomValidity('');
        hideError(form, inputElement, config);
    });
    toggleStateButton(inputList, buttonElement, config);
}

// @todo: Функция валидации поля
function checkInputValidity(formElement, inputElement, config){
    if (inputElement.validity.patternMismatch) {
        inputElement.setCustomValidity(inputElement.dataset.errorMessage || 'Недопустимый формат строки');
    } else {
        inputElement.setCustomValidity('');
    }
    if (!inputElement.validity.valid) {
        showError(formElement, inputElement, inputElement.validationMessage, config);
    } else {
        hideError(formElement, inputElement, config);
    }
}

// @todo: Функция непройденной валидации
function showError(form, input, errorMessage, config) {
    const errorElement = getErrorElement(form, input);
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);

}

// @todo: Функция пройденной валидации
function hideError(form, input, config) {
    const errorElement = getErrorElement(form, input);
    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
}

// @todo: Функция установки статуса кнопки в форме
function toggleStateButton(inputList, buttonElement, config){
    const hasInvalid = inputList.some(input => !input.validity.valid);
    buttonElement.disabled = hasInvalid;
    buttonElement.classList.toggle(config.inactiveButtonClass, hasInvalid);
}

// @todo: Функция получения span по id input
function getErrorElement(formElement, inputElement) {
    return formElement.querySelector(`.${inputElement.id}-error`);
}