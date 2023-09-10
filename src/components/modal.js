import { createCardElement } from "./card.js";

export function saveEditInfo(popup, title, subtitle, nameInput, descriptionInput) {
    title.textContent = nameInput.value;
    subtitle.textContent = descriptionInput.value;
    closePopup(popup);
}

export function saveAddInfo(popup, elementsContainer, nameInput, descriptionInput) {
    const cardElement = createCardElement(nameInput.value, descriptionInput.value);
    elementsContainer.prepend(cardElement);
    nameInput.value = '';
    descriptionInput.value = '';
    closePopup(popup);
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener("keydown", handleEscClose);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(event) {
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_opened');
        closePopup(popup);
    }
}

export function handleOverleyClose(event) {
    if (event.target.classList.contains('popup')) {
        closePopup(event.target);
    }
}