import '../pages/index.css'; // добавьте импорт главного файла стилей 

import {
    initialCards,
    regex,
    ERROR_EMPTY_FIELD,
    ERROR_TOO_SHORT,
    ERROR_INVALID_URL,
    ERROR_INVALID_CHARACTERS
} from "./constants.js";
// common consts 
const elementsContainer = document.querySelector('.elements');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const buttonCloseView = document.querySelector('.popup__close.popup__close-button-for-view');

// edit popup consts
const popupEdit = document.querySelector('.popup.popup_form_edit');
const nameInputEdit = document.querySelector('.popup__edit.popup__edit_form_name.popup_form_edit');
const descriptionInputEdit = document.querySelector('.popup__edit.popup__edit_form_description.popup_form_edit');
const formEdit = document.querySelector('.popup__container.popup_form_edit');
const buttonCloseEdit = document.querySelector('.popup__close.popup_form_edit');
// add popup consts
const popupAdd = document.querySelector('.popup.popup_form_add');
const nameInputAdd = document.querySelector('.popup__edit.popup__edit_form_name.popup_form_add');
const descriptionInputAdd = document.querySelector('.popup__edit.popup__edit_form_description.popup_form_add');
const formAdd = document.querySelector('.popup__container.popup_form_add');
const buttonCloseAdd = document.querySelector('.popup__close.popup_form_add');
// photo popup consts
const popupView = document.querySelector('.popup.popup_form_view')
// error popup consts
const errorNameEdit = document.getElementById('name-error');
const errorDescriptionEdit = document.getElementById('description-error');
const errorNameAdd = document.getElementById('place-error');
const errorDescriptionAdd = document.getElementById('link-error');

//Поля валидации
const fieldsEdit = [{
    input: nameInputEdit,
    error: errorNameEdit,
    type: 'no_url'
}, {
    input: descriptionInputEdit,
    error: errorDescriptionEdit,
    type: 'no_url'
}];
const fieldsAdd = [{
    input: nameInputAdd,
    error: errorNameAdd,
    type: 'no_url'
}, {
    input: descriptionInputAdd,
    error: errorDescriptionAdd,
    type: 'url'
}];

document.addEventListener('DOMContentLoaded', function () {
    initialCards.forEach(card => {
        const cardElement = createCardElement(card.name, card.link);
        elementsContainer.appendChild(cardElement);
    })

    // Обработчик клика на кнопку редактирования
    buttonEdit.addEventListener('click', function (event) {
        nameInputEdit.value = profileTitle.textContent;
        descriptionInputEdit.value = profileSubtitle.textContent;
        console.log('opened edit dialog');
        // Показать диалог
        startValidityAfterLoad();
        openPopup(event, popupEdit);
    });

    buttonAdd.addEventListener('click', function (event) {
        // Показать диалог
        nameInputAdd.value = '';
        descriptionInputAdd.value = '';
        startValidityAfterLoad();
        openPopup(event, popupAdd);
    });

    // Обработчик клика на кнопку закрытия диалога

    buttonCloseEdit.addEventListener('click', function () {
        // Скрыть диалог
        closePopup(popupEdit);
    });

    buttonCloseAdd.addEventListener('click', function () {
        // Скрыть диалог
        closePopup(popupAdd);
    });

    buttonCloseView.addEventListener('click', function () {
        // Скрыть диалог
        closePopup(popupView);
    });

    // Обработчик клика на кнопку сохранения
    formEdit.addEventListener('submit', function (event) {
        event.preventDefault();
        saveEditInfo(popupEdit);
    });
    formAdd.addEventListener('submit', function (event) {
        event.preventDefault();
        saveAddInfo(popupAdd);
    });

    // forms validation
    formEdit.addEventListener("input", () => {
        isFieldValid(fieldsEdit, formEdit);
    });
    formAdd.addEventListener("input", () => {
        isFieldValid(fieldsAdd, formAdd);
    });

    // Ограничение ширины текста в полях ввода
    const nameInputParent = nameInputEdit.parentNode;
    const descriptionInputParent = descriptionInputEdit.parentNode;

    const maxNameInputWidth = nameInputParent.clientWidth; // Максимальная ширина поля ввода имени
    const maxDescriptionInputWidth = descriptionInputParent.clientWidth; // Максимальная ширина поля ввода описания

    // Функция для сокращения текста в поле ввода
    const truncateInputText = (input, maxWidth) => {
        const originalText = input.value;
        input.style.width = 'auto'; // Сброс ширины поля ввода

        while (input.scrollWidth > maxWidth && input.value.length > 0) {
            input.value = input.value.slice(0, -1); // Удаление последнего символа
        }

        // Если текст был сокращен, добавляем многоточие в конце
        if (input.value.length < originalText.length) {
            input.value += '...';
        }

        input.style.width = '100%'; // Восстанавливаем ширину поля ввода
    };

    truncateInputText(nameInputEdit, maxNameInputWidth);
    truncateInputText(descriptionInputEdit, maxDescriptionInputWidth);

    // Обновление ширины текста в полях ввода при изменении размеров окна
    window.addEventListener('resize', function () {
        truncateInputText(nameInputEdit, maxNameInputWidth);
        truncateInputText(descriptionInputEdit, maxDescriptionInputWidth);
    });
});

function saveEditInfo(popup) {
    // Сохранить значения из полей в профиле
    profileTitle.textContent = nameInputEdit.value;
    profileSubtitle.textContent = descriptionInputEdit.value;
    closePopup(popup);
}
function saveAddInfo(popup) {
    const cardElement = createCardElement(nameInputAdd.value, descriptionInputAdd.value);
    elementsContainer.prepend(cardElement);
    closePopup(popup);
}


function openPopup(buttonEvent, popup) {
    popup.classList.add('popup_opened');
    document.addEventListener("keydown", function (event) {
        handleEscClose(event, popup);
    });
    buttonEvent.stopPropagation();
    document.addEventListener("click", function (event) {
        handleOverleyClose(event, popup);
    });
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
}

function handleEscClose(event, popup) {
    console.log(event.key);
    if (event.key === 'Escape') {
        closePopup(popup);
    }
}

function handleOverleyClose(event, popup) {
    let popupContainer = popup.querySelector('[class*="popup__container"]') || popup.querySelector('[class*="popup__view-container"]');
    if (!popupContainer.contains(event.target) && popup.classList.contains('popup_opened')) {
        closePopup(popup);
    }
}


function createCardElement(name, link) {
    const cardTemplate = document.querySelector('#card-template');
    // Клонировать содержимое шаблона
    const cardClone = cardTemplate.content.querySelector('.elements__item').cloneNode(true);

    // Заполнить данные из объекта card
    const cardImage = cardClone.querySelector('.elements__image');
    const cardTitle = cardClone.querySelector('.elements__title');
    // Заполняем ресурсы, а точнее названия и ссылку
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    // Добавить обработчик для кнопки удаления
    const buttonDelete = cardClone.querySelector('.elements__delete');
    buttonDelete.addEventListener('click', (event) => {
        handleDeleteButtonClick(event) // Удаление элемента из DOM
    });

    const buttonLike = cardClone.querySelector('.elements__like')
    buttonLike.addEventListener('click', () => {
        const imageLike = buttonLike.querySelector('.elements__like-image');
        if (buttonLike.classList.contains('elements__like_active')) {
            // Удаляем модификатор и возвращаем изначальную картинку
            buttonLike.classList.remove('elements__like_active');
            imageLike.src = require('../images/like.svg');
        } else {
            // Добавляем модификатор и меняем картинку
            buttonLike.classList.add('elements__like_active');
            imageLike.src = require('../images/like-checked.svg');
        }
    });
    // Листенер для отображения картинки в полный размер
    cardImage.addEventListener('click', (event) => {
        const image = document.querySelector('.popup__photo');
        const title = document.querySelector('.popup__description');
        image.src = cardImage.src;
        title.textContent = cardTitle.textContent;
        openPopup(event, popupView);
    });
    return cardClone;
}

function startValidityAfterLoad() {
    isFieldValid(fieldsEdit, formEdit);
    isFieldValid(fieldsAdd, formAdd);
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

function handleDeleteButtonClick(event) {
    const cardElement = event.target.closest('.elements__item');
    if (cardElement) {
        cardElement.remove(); // Удаление элемента из DOM
    }
}