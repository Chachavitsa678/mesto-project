import '../pages/index.css'; // добавьте импорт главного файла стилей 

import { enableValidation, checkInputValidity } from "./validate.js";
import { openPopup, saveEditInfo, saveAddInfo, handleOverleyClose, closePopup } from "./modal.js";
import { createCardElement } from "./card.js";
import {
    elementsContainer,
    validationSettings,
    profileTitle,
    profileSubtitle,
    buttonAdd,
    buttonEdit,
    popupEdit,
    popupAdd,
    nameInputEdit,
    descriptionInputEdit,
    nameInputAdd,
    descriptionInputAdd,
    formEdit,
    formAdd,
    popupView,
    closeBtnEdit,
    closeBtnAdd,
    closeBtnView,
    initialCards,
    truncateInputText
} from "./utils.js";

setEditInfo();

initialCards.forEach(card => {
    const cardElement = createCardElement(card.name, card.link);
    elementsContainer.appendChild(cardElement);
})
// Обработчик клика на кнопку редактирования
buttonEdit.addEventListener('click', function () {
    // Показать диалог
    setEditInfo();
    openPopup(popupEdit);
});

buttonAdd.addEventListener('click', function () {
    // Показать диалог
    openPopup(popupAdd);
});

// Обработчик клика на кнопку сохранения
formEdit.addEventListener('submit', function (event) {
    event.preventDefault();
    saveEditInfo(popupEdit, profileTitle, profileSubtitle, nameInputEdit, descriptionInputEdit);
});
formAdd.addEventListener('submit', function (event) {
    event.preventDefault();
    saveAddInfo(popupAdd, elementsContainer, nameInputAdd, descriptionInputAdd);
    checkInputValidity(formAdd, validationSettings);
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
window.addEventListener('resize', () => {
    truncateInputText(nameInputEdit, maxNameInputWidth);
    truncateInputText(descriptionInputEdit, maxDescriptionInputWidth);
});

popupEdit.addEventListener('click', handleOverleyClose);
popupAdd.addEventListener('click', handleOverleyClose);
popupView.addEventListener('click', handleOverleyClose);
closeBtnEdit.addEventListener('click', () => {
    closePopup(popupEdit);
});
closeBtnAdd.addEventListener('click', () => {
    closePopup(popupAdd);
});
closeBtnView.addEventListener('click', () => {
    closePopup(popupView);
});

enableValidation(validationSettings);

function setEditInfo() {
    nameInputEdit.value = profileTitle.textContent;
    descriptionInputEdit.value = profileSubtitle.textContent;
}