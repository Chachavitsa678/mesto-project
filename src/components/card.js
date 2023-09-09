import {openPopup} from "./modal.js";
import {popupView} from "./utils.js";

export function createCardElement(name, link) {
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
        setLike(buttonLike);    
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

function setLike(buttonLike) {
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
}

function handleDeleteButtonClick(event) {
    const cardElement = event.target.closest('.elements__item');
    if (cardElement) {
        cardElement.remove(); // Удаление элемента из DOM
    }
}