document.addEventListener('DOMContentLoaded', function () {
    const editButton = document.querySelector('.profile__edit-button');
    const addButton = document.querySelector('.profile__add-button');
    const popup = document.querySelector('.popup');
    const saveButton = document.querySelector('.popup__save-button');
    let isEditDialogOpen;
    const nameInput = document.querySelector('.popup__edit.popup__edit_form_name');
    const descriptionInput = document.querySelector('.popup__edit.popup__edit_form_description');


    // Обработчик клика на кнопку редактирования
    editButton.addEventListener('click', function () {
        const profileTitle = document.querySelector('.profile__title').textContent;
        const profileSubtitle = document.querySelector('.profile__subtitle').textContent;
        isEditDialogOpen = true;

        nameInput.value = profileTitle;
        descriptionInput.value = profileSubtitle;
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
    saveButton.addEventListener('click', function () {
        event.preventDefault();
        if (isEditDialogOpen) {
        const profileTitle = document.querySelector('.profile__title');
        const profileSubtitle = document.querySelector('.profile__subtitle');

        // Сохранить значения из полей в профиле
        profileTitle.textContent = nameInput.value;
        profileSubtitle.textContent = descriptionInput.value;
        } else {
            //Сюда надо добавить логику для нового места
        }
        // Скрыть диалог
        popup.classList.remove('popup_opened');
    });

    const likeButtons = document.querySelectorAll('.elements__like');
    console.log(likeButtons);
    likeButtons.forEach(function (button) {
        button.addEventListener('click', function (event) {
            const likeButton = event.currentTarget.parentNode;
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
       
