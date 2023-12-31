// common consts 
const elementsContainer = document.querySelector('.elements');
const profileTitle = document.querySelector('.profile__title');
const profileAvatar = document.querySelector('.profile__avatar');
const profileSubtitle = document.querySelector('.profile__subtitle');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const avatarButton = document.querySelector('.profile__avatar-button');
const cardTemplate = document.querySelector('#card-template');

// edit popup consts
const popupEdit = document.querySelector('.popup.popup_form_edit');
const nameInputEdit = document.querySelector('.popup__edit.popup__edit_form_name.popup_form_edit');
const descriptionInputEdit = document.querySelector('.popup__edit.popup__edit_form_description.popup_form_edit');
const formEdit = document.querySelector('.popup__container.popup_form_edit');
const closeBtnEdit = document.querySelector('.popup__close.popup_form_edit');
// add popup consts
const popupAdd = document.querySelector('.popup.popup_form_add');
const nameInputAdd = document.querySelector('.popup__edit.popup__edit_form_name.popup_form_add');
const descriptionInputAdd = document.querySelector('.popup__edit.popup__edit_form_description.popup_form_add');
const formAdd = document.querySelector('.popup__container.popup_form_add');
const closeBtnAdd = document.querySelector('.popup__close.popup_form_add');
// photo popup consts
const popupView = document.querySelector('.popup.popup_form_view')
const closeBtnView = document.querySelector('.popup__close.popup__close-button-for-view');
// error popup consts
const errorNameEdit = document.getElementById('name-error');
const errorDescriptionEdit = document.getElementById('description-error');
const errorNameAdd = document.getElementById('place-error');
const errorDescriptionAdd = document.getElementById('link-error');
const errorAvatar = document.getElementById('avatar-error')
// avatar popup consts
const popupAvatar = document.getElementById('popup-avatar');
const formAvatar = document.querySelector('.popup__container.popup_form_avatar');
const linkAvatarInput = document.getElementById('avatar-input');
const closeBtnAvatar = document.getElementById('avatar-close');
// confidence popup consts
const popupConfidence = document.getElementById('popup-confidence');
const formConfidence = document.querySelector('.popup__container.popup_form_confidence');
const closeBtnConfidence = document.getElementById('confidence-close');

//Поля валидации
const validationSettings = {
    formSelector: '.popup__container',
    inputSelector: '.popup__edit',
    submitButtonSelector: '.popup__save-button',
    inactiveButtonClass: 'popup__save-button_disabled',
    errorClass: 'popup__error',
    errorInputModifier: 'popup__edit_error-visible',
    errorMessageModifier: 'popup__error_visible',
};

const regex = /^[a-zA-Zа-яА-Я\- ]+$/;

// Константы для сообщений об ошибках
const ERROR_EMPTY_FIELD = 'Вы пропустили это поле.';
const ERROR_TOO_SHORT = (value) => {
    return 'Минимальное количество символов: 2. Длина текста сейчас: ' + value + ' символ.';
}
const ERROR_INVALID_URL = 'Введите адрес сайта.';
const ERROR_INVALID_CHARACTERS = 'Недопустимые символы.';

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

function checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  
  function renderLoading(submitButton, text) {
    submitButton.textContent = text;
  }


export {
    elementsContainer,
    validationSettings,
    profileAvatar,
    profileTitle,
    profileSubtitle,
    avatarButton,
    buttonAdd,
    buttonEdit,
    popupEdit,
    closeBtnEdit,
    closeBtnAdd,
    closeBtnView,
    popupAdd,
    nameInputEdit,
    descriptionInputEdit,
    formEdit,
    nameInputAdd,
    descriptionInputAdd,
    formAdd,
    popupView,
    errorNameEdit,
    errorDescriptionEdit,
    errorNameAdd,
    errorDescriptionAdd,
    regex,
    ERROR_EMPTY_FIELD,
    ERROR_TOO_SHORT,
    ERROR_INVALID_URL,
    ERROR_INVALID_CHARACTERS,
    truncateInputText,
    checkResponse,
    renderLoading,
    errorAvatar,
    closeBtnAvatar,
    popupAvatar,
    formAvatar,
    linkAvatarInput,
    popupConfidence,
    closeBtnConfidence,
    formConfidence,
    cardTemplate
};

