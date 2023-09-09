import {
    regex,
    ERROR_EMPTY_FIELD,
    ERROR_TOO_SHORT,
    ERROR_INVALID_URL,
    ERROR_INVALID_CHARACTERS
} from "./utils.js";

export function startValidityAfterLoad(arrays) {
    arrays.forEach(array => {
        isFieldValid(array.field, array.form)
        array.form.addEventListener("input", () => {
            isFieldValid(array.field, array.form)
        });
    });
}


const showInputError = (element, errorMessage) => {
    element.classList.add('popup__edit_error-visible');
    errorMessage.classList.add('popup__error_visible');
    errorMessage.textContent = getErrorMessage(element);
};

const hideInputError = (element, errorMessage) => {
    element.classList.remove('popup__edit_error-visible');
    errorMessage.classList.remove('popup__error_visible');
    errorMessage.textContent = getErrorMessage(element);
};

function isFieldValid(fields, form) {
    const button = form.querySelector('.popup__save-button');
    let isTextValid = true;
    let isUrlValid = true; // Изначально устанавливаем isUrlValid в true

    fields.forEach(field => {
        if (field.type === 'url') {
            isUrlValid = isUrlFieldValid(field.input, field.error);
        }
        if (field.type === 'no_url' && !isTextFieldValid(field.input, field.error)) {
            isTextValid = false;
        }
    });


    if (isTextValid && isUrlValid) {
        enabledButton(button);
    } else {
        disabledButton(button);
    }
}

function isTextFieldValid(element, errorMessage) {
    if (!element.validity.valid || !regex.test(element.value)) {
        showInputError(element, errorMessage);
        return false;
    } else {
        hideInputError(element, errorMessage);
        return true;
    }
}

function isUrlFieldValid(element, errorMessage) {
    if (!element.validity.valid) {
        showInputError(element, errorMessage);
        return false;
    } else {
        hideInputError(element, errorMessage);
        return true;
    }
}

function disabledButton(button) {
    button.classList.add('popup__save-button_disabled');
    button.disabled = true;
    button.style.pointerEvents = 'none';
}

function enabledButton(button) {
    button.classList.remove('popup__save-button_disabled');
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