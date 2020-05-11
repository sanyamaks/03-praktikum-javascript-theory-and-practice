const placesList = document.querySelector(".places-list");
const openPopupPlaceCardButton = document.querySelector(
  ".button.user-info__button"
);
const editProfileButton = document.querySelector(".user-info__edit");

const renderCards = () => {
  placesList.innerHTML = "";
  initialCards.map((card, id) => {
    const placeCard = getTemplateCard(card);
    placeCard.id = `${id}`;
    placesList.appendChild(placeCard);
  });
};

const renderProfile = profile => {
  const { name, description } = profile;
  const fullName = document.querySelector(".user-info__name");
  const job = document.querySelector(".user-info__job");
  fullName.textContent = name;
  job.textContent = description;
};

const handleInput = function() {
  const form = this.closest(".popup__form");
  const errorData = checkFormValidity(form);
  const errorDataItem = checkInputValidity(this);
  setSubmitButtonState(form, errorData.every(item => item.valid === true));
  setErrorMessageState(this, errorDataItem.valid === true);
};

const setErrorMessageState = (input, valid) => {
  const errorMessage = input
    .closest(".popup__container")
    .querySelector(".popup__error-message");
  if (!valid) {
    errorMessage.classList.add("popup__error-message_show");
    errorMessage.textContent = input.validationMessage;
  } else {
    errorMessage.classList.remove("popup__error-message_show");
  }
};

const checkInputValidity = input => {
  let valid = true;
  if (input.validity.valueMissing) {
    valid = false;
    input.setCustomValidity(errorMessages.requiredField);
  } else if (input.type === "url") {
    if (input.validity.patternMismatch) {
      valid = false;
      input.setCustomValidity(errorMessages.noLink);
    }
  } else {
    if (input.validity.tooLong || input.validity.tooShort) {
      valid = false;
      input.setCustomValidity(errorMessages.specifiedInterval);
    }
  }
  return { input, valid };
};

const setSubmitButtonState = (form, valid) => {
  const button = form.querySelector(".button");
  if (valid) {
    button.classList.add("popup__button_valid");
  } else {
    button.classList.remove("popup__button_valid");
  }
};

const checkFormValidity = form => {
  /*Можно лучше. Можно коллекцию полей input формы найти через form.querySelector("input"). */
  const elements = Array.from(form.elements);
  return elements.reduce((arr, item) => {
    if (item.tagName === "INPUT") {
      arr.push(checkInputValidity(item));
      return arr;
    }
    return arr;
  }, []);
};

const handleSubmitPlaceCard = function(event) {
  event.preventDefault();
  const errorData = checkFormValidity(this);
  if (!errorData.every(item => item.valid === true)) {
    return null;
  } else {
    const { name, link } = this.elements;
    initialCards.push({ name: name.value, link: link.value });
    this.reset();
    handleClosePopup(event);
    /*REVIEW. Можно лучше. Не думаю, что рационально перерисовывать весь список карточек при удалении карточки.
    При большом количестве карточек это будет занимать заметное время. Можно просто добавлять элемент карточки с помощью
    appendChild в DOM.
    */
    renderCards();
    this.removeEventListener("submit", handleSubmitPlaceCard);
  }
};

const handleSubmitFormProfile = function(event) {
  event.preventDefault();
  const errorData = checkFormValidity(this);
  if (!errorData.every(item => item.valid === true)) {
    return null;
  } else {
    const { name, description } = this.elements;
    renderProfile({ name: name.value, description: description.value });
    this.reset();
    handleClosePopup(event);
    this.removeEventListener("submit", handleSubmitFormProfile);
  }
};

const setEventListenersFormProfile = form => {
  form.addEventListener("submit", handleSubmitFormProfile);
  form.name.addEventListener("input", handleInput);
  form.description.addEventListener("input", handleInput);
};

const setEventListenersFormPlaceCard = form => {
  form.addEventListener("submit", handleSubmitPlaceCard);
  form.name.addEventListener("input", handleInput);
  form.link.addEventListener("input", handleInput);
};

const handleFormPlaceCard = form => {
  form.name.focus();
  setEventListenersFormPlaceCard(form);
};

const handleFormProfile = form => {
  form.name.focus();
  setEventListenersFormProfile(form);
};

const closePopup = popup => {
  popup.classList.remove("popup_is-opened");
};

const setListenersAfterCLosePopup = closeButton => {
  closeButton.removeEventListener("click", handleClosePopup);
  openPopupPlaceCardButton.addEventListener("click", handleOpenPopupPlaceCard);
  editProfileButton.addEventListener("click", handleOpenPopupProfile);
  placesList.addEventListener("click", handleClickPlaceList);
};

const handleClosePopup = event => {
  const closePopupButton = event.target;
  const popup = closePopupButton.closest(".popup");
  const form = popup.querySelector(".popup__form");

  closePopup(popup);
  if (form) {
    form.reset();
    setSubmitButtonState(form, false);
  }
  setListenersAfterCLosePopup(closePopupButton);
};

const setListenersAfterOpenPopup = closeButton => {
  openPopupPlaceCardButton.removeEventListener(
    "click",
    handleOpenPopupPlaceCard
  );
  editProfileButton.removeEventListener("click", handleOpenPopupProfile);
  closeButton.addEventListener("click", handleClosePopup);
  placesList.removeEventListener("click", handleClickPlaceList);
};

const openPopup = popup => {
  popup.classList.add("popup_is-opened");
};

const handleOpenPopupPlaceCard = () => {
  const popupPlaceCard = document.querySelector(".popup_place-card");
  const form = popupPlaceCard.querySelector(".popup__form");
  const closePopupButton = popupPlaceCard.querySelector(".popup__close");

  openPopup(popupPlaceCard);
  setListenersAfterOpenPopup(closePopupButton);
  handleFormPlaceCard(form);
};

const handleOpenPopupProfile = () => {
  const popupProfile = document.querySelector(".popup_profile");
  const form = popupProfile.querySelector(".popup__form");
  const closePopupButton = popupProfile.querySelector(".popup__close");
  const fullName = document.querySelector(".user-info__name");
  const job = document.querySelector(".user-info__job");

  form.name.value = fullName.textContent;
  form.description.value = job.textContent;
  openPopup(popupProfile);
  setListenersAfterOpenPopup(closePopupButton);
  handleFormProfile(form);

  const errorData = checkFormValidity(form);
  if (errorData.every(item => item.valid === true)) {
    setSubmitButtonState(form, true);
  }
};

const handleOpenPopupImage = id => {
  const popupImage = document.querySelector(".popup_image");
  const image = document.querySelector(".popup__image");
  const closePopupButton = popupImage.querySelector(".popup__close");

  image.src = initialCards[id].link;

  openPopup(popupImage);
  setListenersAfterOpenPopup(closePopupButton);
};

const showImage = event => {
  if (event.target.classList.contains("place-card__image")) {
    const id = event.target.closest(".place-card").id;
    handleOpenPopupImage(id);
  }
};

const removeChild = event => {
  if (event.target.classList.contains("place-card__delete-icon")) {
    const id = event.target.closest(".place-card").id;
    initialCards.splice(id, 1);
    /*REVIEW. Можно лучше. Не думаю, что рационально перерисовывать весь список карточек при удалении карточки.
    При большом количестве карточек это будет занимать заметное время. Можно просто удалять элемент карточки из DOM.
    */
    renderCards();
  }
};

const clickLike = event => {
  if (event.target.classList.contains("place-card__like-icon")) {
    event.target.classList.toggle("place-card__like-icon_liked");
  }
};

const handleClickPlaceList = event => {
  clickLike(event);
  removeChild(event);
  showImage(event);
};

openPopupPlaceCardButton.addEventListener("click", handleOpenPopupPlaceCard);
editProfileButton.addEventListener("click", handleOpenPopupProfile);
placesList.addEventListener("click", handleClickPlaceList);

renderCards();

/* REVIEW.Резюме1.

Не работает корректно валидация обеих форм. Не сделан перенос информации о профиле в поля формы профиля из DOM-элементов страницы.


Что можно улучшить.

1.Можно коллекцию полей input формы найти через form.querySelector("input").

2. Нерационально перерисовывать весь список карточек при удалении или добавлении карточки.
При большом количестве карточек это будет занимать заметное время. Можно просто удалять или добавлять элемент карточки в DOM.



Что нужно исправить.

1. По обязательному условию задания 7 требуется заносить информацию из DOM-элементов страницы, хранящих информацию о профиле, в
поля формы профиля при её открытии, то есть в слушателе события открытия этой формы. Поскольку при открытии на форме будет всегда
валидная информация, кнопка сабмита этой формы при открытии должна быть в активном состоянии и на форме не должны присутствовать
сообщения об ошибках.
Поэтому в слушателе открытия формы профиля, кроме переноса информации со страницы, нужно производить удаление сообщений об ошибках
и делать активной кнопку сабмита.

2. Нужно правильной сделать полную валидацию формы профиля, как требуется по заданию (прочитайте об этом в описании задания, там подробно описана эта валидация
и показан её результат на нескольких видео). При этом надо иметь в виду, что требуется валидация формы при событиях input, а не submit.

3. Нужно сделать правильной  валидацию формы карточки, по заданию требуется либо делать правильно полную валидацию, либо минимальную
(прочитайте об этом в описании задания).
То есть валидация может быть по любому варианту, лишь бы она была правильной.
При этом надо иметь в виду, что требуется валидация формы при событиях input, а не submit.

*/

