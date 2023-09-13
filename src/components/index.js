import '../pages/index.css'; // добавьте импорт главного файла стилей 

import { checkInputValidity, enableValidation } from "./validate.js";
import { openPopup, handleOverleyClose, closePopup } from "./modal.js";
import { renderCard } from "./card.js";
import { getProfile, getCards, updateProfileInfo, updateAvatar, postCard, deleteCardFromServer } from './api.js';
import {
    validationSettings,
    profileAvatar,
    profileTitle,
    profileSubtitle,
    avatarButton,
    buttonAdd,
    buttonEdit,
    popupEdit,
    popupAdd,
    nameInputEdit,
    nameInputAdd,
    descriptionInputEdit,
    descriptionInputAdd,
    formEdit,
    formAdd,
    popupView,
    closeBtnEdit,
    closeBtnAdd,
    closeBtnView,
    truncateInputText,
    closeBtnAvatar,
    popupAvatar,
    formAvatar,
    linkAvatarInput,
    renderLoading,
    popupConfidence,
    closeBtnConfidence,
    cardTemplate,
    formConfidence
} from "./utils.js";

export let userId = '';

// Обработчик клика на кнопку редактирования
buttonEdit.addEventListener('click', function () {
    // Показать диалог
    setEditInfo(profileTitle.textContent, profileSubtitle.textContent);
    openPopup(popupEdit);
});

buttonAdd.addEventListener('click', function () {
    // Показать диалог
    openPopup(popupAdd);
});

avatarButton.addEventListener('click', () => {
    formAvatar.reset();
    openPopup(popupAvatar);
});

formAvatar.addEventListener('submit', function (event) {
    event.preventDefault();
    const button = formAvatar.querySelector(validationSettings.submitButtonSelector);
    renderLoading(button, 'Сохранение...');
    updateAvatar(linkAvatarInput.value)
        .then(data => {
            profileAvatar.src = data.avatar
        }).catch(console.error)
        .finally(() => {
            closePopup(popupAvatar);
            renderLoading(button, 'Сохранить');
        });
});

// Обработчик клика на кнопку сохранения
formEdit.addEventListener('submit', function (event) {
    event.preventDefault();
    const button = formEdit.querySelector(validationSettings.submitButtonSelector);
    renderLoading(button, 'Сохранение...');
    updateProfileInfo(nameInputEdit.value, descriptionInputEdit.value)
        .then(data => {
            console.log("update:", data);
            profileTitle.textContent = data.name;
            profileSubtitle.textContent = data.about;
        }).catch(error => {
            console.error("Error: ", error)
        }
        ).finally(() => {
            closePopup(popupEdit);
            renderLoading(button, 'Сохранить');
        });

});
formAdd.addEventListener('submit', handlePlaceFormSubmit);

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
popupAvatar.addEventListener('click', handleOverleyClose);
popupConfidence.addEventListener('click', handleOverleyClose);
closeBtnEdit.addEventListener('click', () => {
    closePopup(popupEdit);
});
closeBtnAdd.addEventListener('click', () => {
    closePopup(popupAdd);
});
closeBtnView.addEventListener('click', () => {
    closePopup(popupView);
});
closeBtnAvatar.addEventListener('click', () => {
    closePopup(popupAvatar);
});
closeBtnConfidence.addEventListener('click', () => {
    closePopup(popupConfidence);
});

Promise.all([getProfile(), getCards()])
    .then(([userData, cards]) => {
        console.log("userData: ", userData);
        createProfileInfo(userData);
        userId = userData._id;
        cards.reverse();
        cards.forEach((card) => {
            renderCard(card, cardTemplate);
        });
    })
    .catch(console.error)

enableValidation(validationSettings);

function createProfileInfo(userData) {
    profileTitle.textContent = userData.name;
    profileSubtitle.textContent = userData.about;
    setEditInfo(userData.name, userData.about);
    profileAvatar.src = userData.avatar;
}

function setEditInfo(name, about) {
    nameInputEdit.value = name;
    descriptionInputEdit.value = about;
    checkInputValidity(formEdit, validationSettings);
}

function handlePlaceFormSubmit(event) {
    event.preventDefault();
    const button = formAdd.querySelector(validationSettings.submitButtonSelector);
    console.log("кнопка ", button);
    renderLoading(button, 'Создание...');
    const promisePost = postCard(nameInputAdd.value, descriptionInputAdd.value);
    promisePost.then((card) => {
        renderCard(card, cardTemplate);
    })
        .then(() => {
            formAdd.reset();
            closePopup(popupAdd);
            checkInputValidity(formAdd, validationSettings);
        })
        .catch(console.error)
        .finally(() => {
            renderLoading(button, 'Создать');
        })
}

export function areYouSure(domElement) {
    const button = formConfidence.querySelector(validationSettings.submitButtonSelector);
    renderLoading(button, 'Удаляем...');
    deleteCardFromServer(domElement.id)
        .then(() => {
            domElement.remove();
            closePopup(popupConfidence);
        })
        .catch(console.error)
        .finally(() => {
            renderLoading(button, 'Да');
        });
}