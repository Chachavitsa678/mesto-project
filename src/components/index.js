import '../pages/index.css'; // добавьте импорт главного файла стилей 

import { startValidityAfterLoad } from "./validate";
import {openPopup, saveEditInfo, saveAddInfo} from "./modal.js";
import { createCardElement } from "./card.js";
import {
    elementsContainer,
    profileTitle,
    profileSubtitle,
    buttonAdd,
    buttonEdit,
    popupEdit,
    fieldsValidate,
    popupAdd,
    nameInputEdit,
    descriptionInputEdit,
    nameInputAdd,
    descriptionInputAdd,
    formEdit,
    formAdd,
    initialCards,
    truncateInputText
} from "./utils.js";

document.addEventListener('DOMContentLoaded', function () {
    initialCards.forEach(card => {
        const cardElement = createCardElement(card.name, card.link);
        elementsContainer.appendChild(cardElement);
    })
    // setup after loading DOM, 
    nameInputEdit.value = profileTitle.textContent;
    descriptionInputEdit.value = profileSubtitle.textContent;
    // Обработчик клика на кнопку редактирования
    buttonEdit.addEventListener('click', function (event) {
        console.log('opened edit dialog');
        // Показать диалог
        openPopup(event, popupEdit);
    });

    buttonAdd.addEventListener('click', function (event) {
        // Показать диалог
        nameInputAdd.value = '';
        descriptionInputAdd.value = '';
        openPopup(event, popupAdd);
    });
    // Validation
    startValidityAfterLoad(fieldsValidate);

    // Обработчик клика на кнопку сохранения
    formEdit.addEventListener('submit', function (event) {
        event.preventDefault();
        saveEditInfo(profileTitle, profileSubtitle, nameInputEdit, descriptionInputEdit);
    });
    formAdd.addEventListener('submit', function (event) {
        event.preventDefault();
        saveAddInfo(elementsContainer, nameInputAdd, descriptionInputAdd);
    });

    // Ограничение ширины текста в полях ввода
    const nameInputParent = nameInputEdit.parentNode;
    const descriptionInputParent = descriptionInputEdit.parentNode;

    const maxNameInputWidth = nameInputParent.clientWidth; // Максимальная ширина поля ввода имени
    const maxDescriptionInputWidth = descriptionInputParent.clientWidth; // Максимальная ширина поля ввода описания

    // Функция для сокращения текста в поле ввода
    truncateInputText(nameInputEdit, maxNameInputWidth);
    truncateInputText(descriptionInputEdit, maxDescriptionInputWidth);

    // Обновление ширины текста в полях ввода при изменении размеров окна
    window.addEventListener('resize', function () {
        truncateInputText(nameInputEdit, maxNameInputWidth);
        truncateInputText(descriptionInputEdit, maxDescriptionInputWidth);
    });
});