// common consts 
const elementsContainer = document.querySelector('.elements');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

// edit popup consts
const popupEdit = document.querySelector('.popup.popup_form_edit');
const nameInputEdit = document.querySelector('.popup__edit.popup__edit_form_name.popup_form_edit');
const descriptionInputEdit = document.querySelector('.popup__edit.popup__edit_form_description.popup_form_edit');
const formEdit = document.querySelector('.popup__container.popup_form_edit');
// add popup consts
const popupAdd = document.querySelector('.popup.popup_form_add');
const nameInputAdd = document.querySelector('.popup__edit.popup__edit_form_name.popup_form_add');
const descriptionInputAdd = document.querySelector('.popup__edit.popup__edit_form_description.popup_form_add');
const formAdd = document.querySelector('.popup__container.popup_form_add');
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

const fieldsValidate = [
    {
        field: fieldsEdit,
        form: formEdit
    },

    {
        field: fieldsAdd,
        form: formAdd
    }

];

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

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


export {
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
    formEdit,
    nameInputAdd,
    descriptionInputAdd,
    formAdd,
    popupView,
    errorNameEdit,
    errorDescriptionEdit,
    errorNameAdd,
    errorDescriptionAdd,
    initialCards,
    regex,
    ERROR_EMPTY_FIELD,
    ERROR_TOO_SHORT,
    ERROR_INVALID_URL,
    ERROR_INVALID_CHARACTERS,
    truncateInputText
};
