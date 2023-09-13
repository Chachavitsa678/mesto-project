import { openPopup} from "./modal.js";
import {
    popupView,
    elementsContainer,
    popupConfidence,
    formConfidence
} from "./utils.js";
import { putLike, deleteLike } from './api'
import { 
    userId,
    areYouSure
 } from "./index.js";

function createCardElement(cardData, cardTemplate) {
    // Клонировать содержимое шаблона
    const cardClone = cardTemplate.content.querySelector('.elements__item').cloneNode(true);

    // Заполнить данные из объекта card
    const cardImage = cardClone.querySelector('.elements__image');
    const cardTitle = cardClone.querySelector('.elements__title');
    // Заполняем ресурсы, а точнее названия и ссылку
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    cardClone.id = cardData._id;
    console.log("likes ", cardData.likes);

    // Добавить обработчик для кнопки удаления
    const buttonDelete = cardClone.querySelector('.elements__delete');
    if (userId !== cardData.owner._id) {
        buttonDelete.remove();
    } else {
        buttonDelete.addEventListener('click', handleDeleteButtonClick);
    }
    const buttonLike = cardClone.querySelector('.elements__like-image')
    buttonLike.addEventListener('click', setLike);
    const likeCounter = cardClone.querySelector('.elements__like-counter');
    likeCounter.textContent = cardData.likes.length;
    getLikesFromServer(cardData, buttonLike, likeCounter);
    // Листенер для отображения картинки в полный размер
    cardImage.addEventListener('click', (event) => {
        const image = document.querySelector('.popup__photo');
        const title = document.querySelector('.popup__description');
        image.src = cardImage.src;
        title.textContent = cardTitle.textContent;
        openPopup(popupView);
    });
    return cardClone;
}

function setLike(event) {
    const likeBtn = event.target;
    const item = likeBtn.closest('.elements__item')
    const likeCounter = item.querySelector('.elements__like-counter');
    console.log("кнопка ", item.id);
    if (!likeBtn.classList.contains('elements__like_active')) {
        putLike(item.id)
            .then((res) => {
                addLike(likeBtn, likeCounter, res.likes.length);
                console.log("added ", likeCounter);
            })
            .catch(console.error);
    } else {
        deleteLike(item.id)
            .then((res) => {
                removeLike(likeBtn, likeCounter, res.likes.length);
                console.log("removed ", res.likes.length);
            })
            .catch(console.error);
    }
}

function getLikesFromServer(cardData, button, counter) {
    const userIds = cardData.likes.map(user => {
        return user._id;
    })
    if (userIds.includes(userId)) {
        addLike(button, counter, cardData.likes.length);
        counter.textContent = cardData.likes.length;
    }
}

export function renderCard(cardData, cardTemplate) {
    const cardElement = createCardElement(cardData, cardTemplate);
    elementsContainer.prepend(cardElement);
}

function handleDeleteButtonClick(event) {
    event.preventDefault();
    const deleteButton = event.target;
    const placeCard = deleteButton.closest('.elements__item');
    openPopup(popupConfidence);
    formConfidence.addEventListener('submit', (event) => {
        event.preventDefault();
        areYouSure(placeCard);
    });

}

function addLike(button, likeCounter, likes) {
    button.classList.add('elements__like_active');
    button.src = require('../images/like-checked.svg');
    likeCounter.textContent = likes;
}

function removeLike(button, likeCounter, likes) {
    button.classList.remove('elements__like_active');
    button.src = require('../images/like.svg');
    likeCounter.textContent = likes;
}

