
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
