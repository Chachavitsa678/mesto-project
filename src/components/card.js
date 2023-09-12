import { openPopup, closePopup } from "./modal.js";
import {
    popupView,
    popupAdd,
    elementsContainer,
    nameInputAdd,
    descriptionInputAdd,
    formAdd,
    validationSettings,
    renderLoading,
    popupConfidence,
    formConfidence,
    updateTime
} from "./utils.js";
import { postCard, deleteCardFromServer, addLike, deleteLike } from './api'
import { userId } from "./index.js";
import { checkInputValidity } from "./validate.js";

function createCardElement(cardData) {
    const cardTemplate = document.querySelector('#card-template');
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
        addLike(item.id)
            .then((res) => {
                likeBtn.classList.add('elements__like_active');
                likeBtn.src = require('../images/like-checked.svg');
                console.log("added ", likeCounter);
                likeCounter.textContent = res.likes.length;
            })
            .catch(console.error);
    } else {
        deleteLike(item.id)
            .then((res) => {
                likeBtn.classList.remove('elements__like_active');
                likeBtn.src = require('../images/like.svg');
                console.log("removed ", res.likes.length);
                likeCounter.textContent = res.likes.length;
            })
            .catch(console.error);
    }
}

export function handlePlaceFormSubmit(event) {
    event.preventDefault();
    const button = formAdd.querySelector(validationSettings.submitButtonSelector);
    console.log("кнопка ", button);
    renderLoading(button, 'Создание...');
    const promisePost = postCard(nameInputAdd.value, descriptionInputAdd.value);
    promisePost.then((card) => {
        renderCard(card);
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

function getLikesFromServer(cardData, button, counter) {
    const userIds = cardData.likes.map(user => {
        return user._id;
    })
    if (userIds.includes(userId)) {
        button.classList.add('elements__like_active');
        button.src = require('../images/like-checked.svg');
        counter.textContent = cardData.likes.length;
    }
}

export function renderCard(cardData) {
    const cardElement = createCardElement(cardData);
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

function areYouSure(placeCard) {
    const button = formConfidence.querySelector(validationSettings.submitButtonSelector);
    renderLoading(button, 'Удаляем...');
    deleteCardFromServer(placeCard.id)
        .then(() => {
            placeCard.remove();
        })
        .catch(console.error)
        .finally(() =>{
            closePopup(popupConfidence);
            setTimeout(() => {
                renderLoading(button, 'Да');
            }, updateTime);
        });
}