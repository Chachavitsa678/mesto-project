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
const buttonCloseEdit = document.querySelector('.popup__close.popup_form_edit');
// add popup consts
const popupAdd = document.querySelector('.popup.popup_form_add');
const nameInputAdd = document.querySelector('.popup__edit.popup__edit_form_name.popup_form_add');
const descriptionInputAdd = document.querySelector('.popup__edit.popup__edit_form_description.popup_form_add'); 
const formAdd = document.querySelector('.popup__container.popup_form_add');
const buttonCloseAdd = document.querySelector('.popup__close.popup_form_add');
// photo popup consts
const popupView = document.querySelector('.popup.popup_form_view')

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
        openPopup(popupEdit);
    });

    buttonAdd.addEventListener('click', function () { 
        // Показать диалог
        openPopup(popupAdd);
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
    // Обработчик клика на кнопку сохранения
    formEdit.addEventListener('submit', function (event) {
        event.preventDefault();
        saveInfo(popupEdit);
    });
    formAdd.addEventListener('submit', function (event) {
        event.preventDefault();
        saveInfo(popupAdd);
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

function saveInfo(popup) {
    // Сохранить значения из полей в профиле
    if (popup === popupEdit) {
        profileTitle.textContent = nameInputEdit.value;
        profileSubtitle.textContent = descriptionInputEdit.value;
    } else if (popup === popupAdd) {
    const cardElement = createCardElement(nameInputAdd.value, descriptionInputAdd.value);
    elementsContainer.prepend(cardElement);
    nameInputAdd.value = '';
    descriptionInputAdd.value = '';
    }
    // Скрыть диалог
    closePopup(popup);
}
function openPopup(popup){
    popup.classList.add('popup_opened'); 
}

function closePopup(popup){
    popup.classList.add('popup_closed');
    popup.addEventListener('animationend', function () {
        popup.classList.remove('popup_closed', 'popup_opened');
    }, { once: true });
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
            imageLike.src = './images/like.svg';
        } else {
            // Добавляем модификатор и меняем картинку
            buttonLike.classList.add('elements__like_active');
            imageLike.src = './images/like-checked.svg';
        }
    });
    // Листенер для отображения картинки в полный размер
    cardImage.addEventListener('click', () => {
        const image = document.querySelector('.popup__photo');
        const title = document.querySelector('.popup__description');
        image.src = cardImage.src;
        title.textContent = cardTitle.textContent;
        openPopup(popupView);
    });
    const buttonClose = document.querySelector('.popup__close.popup__close-button-for-view')
    buttonClose.addEventListener('click', function () {
        // Скрыть диалог
        closePopup(popupView);
    });
    return cardClone;
}

function handleDeleteButtonClick(event) {
    const cardElement = event.target.closest('.elements__item');
    if (cardElement) {
        cardElement.remove(); // Удаление элемента из DOM
    }
}
function handleDeleteButtonClick(event) {
    const cardElement = event.target.closest('.elements__item');
    if (cardElement) {
        cardElement.remove(); // Удаление элемента из DOM
    }
}


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

