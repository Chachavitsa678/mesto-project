export const initialCards = [
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

export const regex = /^[a-zA-Zа-яА-Я\- ]+$/;

// Константы для сообщений об ошибках
export const ERROR_EMPTY_FIELD = 'Вы пропустили это поле.';
export const ERROR_TOO_SHORT = (value) => {
   return 'Минимальное количество символов: 2. Длина текста сейчас: ' + value + ' символ.';
}
export const ERROR_INVALID_URL = 'Введите адрес сайта.';
export const ERROR_INVALID_CHARACTERS = 'Недопустимые символы.';
