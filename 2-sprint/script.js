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
  const {name, description} = profile;
  const fullName = document.querySelector(".user-info__name");
  const job = document.querySelector(".user-info__job");
  fullName.textContent = name;
  job.textContent = description;
};

const handleInput = function () {
  const form = this.closest(".popup__form");
  const errorData = checkFormValidity(form);
  const errorDataItem = checkInputValidity(this);
  if (errorData.every(item => item.valid === true)) {
    setSubmitButtonState(form, true);
  }
  if (errorDataItem.valid === true) {
    setErrorMessageState(this, true);
  }
};

const setErrorMessageState = (input, valid) => {
  const errorMessage = input.closest(".popup__container").querySelector(".popup__error-message");
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
  return {input, valid};
};

const setSubmitButtonState = (form, valid) => {
  const button = form.querySelector(".button");
  if (valid) {
    button.classList.add("popup__button_valid");
  } else {
    button.classList.remove("popup__button_valid");
  }
};

const checkFormValidity = (form) => {
  const elements = Array.from(form.elements);
  return elements.reduce((arr, item) => {
    if (item.tagName === "INPUT") {
      arr.push(checkInputValidity(item));
      return arr
    }
    return arr
  }, []);
};

const handleSubmitPlaceCard = function (event) {
  event.preventDefault();
  const errorData = checkFormValidity(this);
  if (errorData.every(item => item.valid === true)) {
    const {name, link} = this.elements;
    initialCards.push({name: name.value, link: link.value});
    this.reset();
    handleClosePopup(event);
    renderCards();
    this.removeEventListener("submit", handleSubmitPlaceCard);
  } else {
    errorData.forEach(function (errorDataItem) {
      setErrorMessageState(errorDataItem.input, errorDataItem.valid);
    })
  }
  setSubmitButtonState(this, false);
};

const handleSubmitFormProfile = function (event) {
  event.preventDefault();
  const errorData = checkFormValidity(this);
  if (errorData.every(item => item.valid === true)) {
    const {name, description} = this.elements;
    renderProfile({name: name.value, description: description.value});
    this.reset();
    handleClosePopup(event);
    this.removeEventListener("submit", handleSubmitFormProfile);
  } else {
    errorData.forEach(function (errorDataItem) {
      setErrorMessageState(errorDataItem.input, errorDataItem.valid);
    })
  }
  setSubmitButtonState(this, false);
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
  openPopupPlaceCardButton.removeEventListener("click", handleOpenPopupPlaceCard);
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

  openPopup(popupProfile);
  setListenersAfterOpenPopup(closePopupButton);
  handleFormProfile(form);
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
