import { createCardElement } from "./card.js";

let currentPopup = null;


export function saveEditInfo(title, subtitle, nameInput, descriptionInput) {
    console.log("is popup exsist: ", currentPopup);
    title.textContent = nameInput.value;
    subtitle.textContent = descriptionInput.value;
    closePopup(currentPopup);
}

export function saveAddInfo(elementsContainer, nameInput, descriptionInput) {
    const cardElement = createCardElement(nameInput.value, descriptionInput.value);
    elementsContainer.prepend(cardElement);
    closePopup(currentPopup);
}

export function openPopup(buttonEvent, popup) {
    currentPopup = popup;
    popup.classList.add('popup_opened');
    document.addEventListener("keydown", function (event) {
        handleEscClose(event, popup);
    });
    buttonEvent.stopPropagation();
    document.addEventListener("click", function (event) {
        handleOverleyClose(event, popup);
    });
    const popupClose = currentPopup.querySelector('.popup__close-image')
    popupClose.addEventListener('click', function () {
        // Скрыть диалог
        closePopup(popup);
    });
}

function closePopup(popup) {
    popup.classList.remove('popup_opened');
    currentPopup = null;
}

function handleEscClose(event, popup) {
    console.log(event.key);
    if (event.key === 'Escape') {
        closePopup(popup);
    }
}

function handleOverleyClose(event, popup) {
    let popupContainer = popup.querySelector('[class*="popup__container"]') || popup.querySelector('[class*="popup__view-container"]');
    if (!popupContainer.contains(event.target) && popup.classList.contains('popup_opened')) {
        closePopup(popup);
    }
}