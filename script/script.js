const elementsContainer = document.querySelector('.elements');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const popup = document.querySelector('.popup');
const saveButton = document.querySelector('.popup__save-button');
let isEditDialogOpen;
const nameInput = document.querySelector('.popup__edit.popup__edit_form_name');
const descriptionInput = document.querySelector('.popup__edit.popup__edit_form_description');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

document.addEventListener('DOMContentLoaded', function () {
    initialCards.forEach(card =>{
        const cardElement = createCardElement(card.name, card.link);
        elementsContainer.appendChild(cardElement);
    })

    // Обработчик клика на кнопку редактирования
    editButton.addEventListener('click', function () {
        const profileTitleText = profileTitle.textContent;
        const profileSubtitleText = profileSubtitle.textContent;
        isEditDialogOpen = true;
        nameInput.value = profileTitleText;
        descriptionInput.value = profileSubtitleText;
        console.log("opened dialog")
        // Показать диалог
        popup.classList.add('popup_opened');
    });

    addButton.addEventListener('click', function () {
        const popupTitle = document.querySelector('.popup__title');
        popupTitle.textContent = 'Новое место';
        saveButton.textContent = 'Создать';
        isEditDialogOpen = false;

        nameInput.value = '';
        descriptionInput.value = '';
        console.log("opened dialog")
        // Показать диалог
        popup.classList.add('popup_opened');
    });

    // Обработчик клика на кнопку закрытия диалога
    const closeButton = document.querySelector('.popup__close');
    closeButton.addEventListener('click', function () {
        // Скрыть диалог
        popup.classList.remove('popup_opened');
    });
    // Обработчик клика на кнопку сохранения
    saveButton.addEventListener('click', function(event){
        event.preventDefault();
        saveInfo();
    });
    // Обработчики Enter
    nameInput.addEventListener('keydown', function(event) {
        handleEnterKey(event);
    });
    
    descriptionInput.addEventListener('keydown', function(event) {
        handleEnterKey(event);
    });
    
    // Ограничение ширины текста в полях ввода
    const nameInputParent = nameInput.parentNode;
    const descriptionInputParent = descriptionInput.parentNode;

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

    truncateInputText(nameInput, maxNameInputWidth);
    truncateInputText(descriptionInput, maxDescriptionInputWidth);

    // Обновление ширины текста в полях ввода при изменении размеров окна
    window.addEventListener('resize', function () {
        truncateInputText(nameInput, maxNameInputWidth);
        truncateInputText(descriptionInput, maxDescriptionInputWidth);
    });
});

function handleEnterKey(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        saveInfo();
    }
}

function saveInfo() {
    if (isEditDialogOpen) {
        const profileTitle = document.querySelector('.profile__title');
        const profileSubtitle = document.querySelector('.profile__subtitle');
        // Сохранить значения из полей в профиле
        profileTitle.textContent = nameInput.value;
        profileSubtitle.textContent = descriptionInput.value;
    } else {
        //Сюда надо добавить логику для нового места
        const cardElement = createCardElement(nameInput.value, descriptionInput.value);
        elementsContainer.appendChild(cardElement);
    }
    // Скрыть диалог
    popup.classList.remove('popup_opened');
}

function createCardElement(name, link) {
    const cardTemplate = document.querySelector('#card-template');
    // Клонировать содержимое шаблона
    const cardClone = cardTemplate.content.cloneNode(true);

    // Заполнить данные из объекта card
    const cardImage = cardClone.querySelector('.elements__image');
    const cardTitle = cardClone.querySelector('.elements__title');
    // Заполняем ресурсы, а точнее названия и ссылку
    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    // Добавить обработчик для кнопки удаления
    const deleteButton = cardClone.querySelector('.elements__delete');
    deleteButton.addEventListener('click', (event) => {
        handleDeleteButtonClick(event) // Удаление элемента из DOM
    });
    // Перенес сюда лайки, потому что теперь не нужно проходить через все элементы, которые есть
    // По сути все листенеры здесь обрабатывают только ту карточку на которую нажали
    const likeButton = cardClone.querySelector('.elements__like')
    likeButton.addEventListener('click', () => {
        const likeImage = likeButton.querySelector('.elements__like-image');
        if (likeButton.classList.contains('elements__like_active')) {
            // Удаляем модификатор и возвращаем изначальную картинку
            likeButton.classList.remove('elements__like_active');
            likeImage.src = './images/like.svg';
        } else {
            // Добавляем модификатор и меняем картинку
            likeButton.classList.add('elements__like_active');
            likeImage.src = './images/like-checked.svg';
        }
    });
    // Листенер для отображения картинки в полный размер
    // Нужно поправить внешку и это уже сама
    // Все лишние комментарии сотри перед отправкой на ревью
    cardImage.addEventListener('click', () => {
        const dialog = document.querySelector('.popup.popup_view')
        const image = document.querySelector('.popup__photo');
        const title = document.querySelector('.popup__description');
        image.src = cardImage.src;
        title.textContent = cardTitle.textContent;
        dialog.classList.add('popup_opened');
    });
    const closeButtons = document.querySelector('.popup__close.popup__close-button-for-view')
    closeButtons.addEventListener('click', function () {
        // Скрыть диалог
        const dialog = document.querySelector('.popup.popup_view')
        dialog.classList.remove('popup_opened');
    });
    return cardClone;
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
