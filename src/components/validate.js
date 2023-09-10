import {
    regex,
    ERROR_EMPTY_FIELD,
    ERROR_TOO_SHORT,
    ERROR_INVALID_URL,
    ERROR_INVALID_CHARACTERS
} from "./utils.js";

export function enableValidation(settings) {
    const forms = document.querySelectorAll(settings.formSelector);
    forms.forEach(form => {
        checkInputValidity(form, settings);
        setEventListeners(form, settings);
    });
}

const setEventListeners = (formElement, settings) => {
    formElement.addEventListener('input', () => {
        checkInputValidity(formElement, settings);
    });
};

export const checkInputValidity = (formElement, settings) => {
    const button = formElement.querySelector(settings.submitButtonSelector);
    let isTextValid = true;
    let isUrlValid = true;
    const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
    inputList.forEach(field => {
        if (field.type === 'url') {
            isUrlValid = isUrlFieldValid(field, settings);
        }
        if (field.type !== 'url' && !isTextFieldValid(field, settings)) {
            isTextValid = false;
        }
    });

    if (isTextValid && isUrlValid) {
        enabledButton(button, settings);
    } else {
        disabledButton(button, settings);
    }
};

function isTextFieldValid(element, settings) {
    if (!element.validity.valid || !regex.test(element.value)) {
        showInputError(element, settings);
        return false;
    } else {
        hideInputError(element, settings);
        return true;
    }
}

function isUrlFieldValid(element, settings) {
    if (!element.validity.valid) {
        showInputError(element, settings);
        return false;
    } else {
        hideInputError(element, settings);
        return true;
    }
}


const showInputError = (formInput, settings) => {
    const inputError = formInput.nextElementSibling;
    formInput.classList.add(settings.errorInputModifier);
    inputError.textContent = getErrorMessage(formInput);
    inputError.classList.add(settings.errorMessageModifier);
};

const hideInputError = (formInput, settings) => {
    const inputError = formInput.nextElementSibling;
    formInput.classList.remove(settings.errorInputModifier);
    inputError.classList.remove(settings.errorMessageModifier);
    inputError.textContent = '';
};

function disabledButton(button, settings) {
    button.classList.add(settings.inactiveButtonClass);
    button.disabled = true;
    button.style.pointerEvents = 'none';
}

function enabledButton(button, settings) {
    button.classList.remove(settings.inactiveButtonClass);
    button.disabled = false;
    button.style.pointerEvents = 'auto';
}

function getErrorMessage(element) {
    let errorString = '';
    if (element.value === '') {
        errorString = ERROR_EMPTY_FIELD;
    } else if (element.validity.tooShort) {
        errorString = ERROR_TOO_SHORT(element.value.length);
    } else if (element.validity.typeMismatch) {
        errorString = ERROR_INVALID_URL;
    } else if (!regex.test(element.value) && element.type != 'url') {
        errorString = ERROR_INVALID_CHARACTERS;
    }
    return errorString;
}