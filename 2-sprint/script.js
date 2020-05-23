const placesList = document.querySelector(".places-list");
const openPopupPlaceCardButton = document.querySelector(
  ".button.user-info__button"
);
const editProfileButton = document.querySelector(".user-info__edit");
const fullName = document.querySelector(".user-info__name");
const job = document.querySelector(".user-info__job");

const card = new Card();
const cardList = new CardList(placesList, initialCards);
const userInfo = new UserInfo(fullName, job);

const handleOpenPopupPlaceCard = () => {
  const popupPlaceCard = document.querySelector(".popup_place-card");
  const formPlaceCard = popupPlaceCard.querySelector(".popup__form");
  const formValidator = new FormValidator(formPlaceCard);
  const popup = new Popup(popupPlaceCard);
  const form = new FormPlaceCard(formPlaceCard, formValidator, popup);

  formValidator.setErrorMessageState(formPlaceCard.name, "", true);
  formValidator.setErrorMessageState(formPlaceCard.link, "", true);

  popup.open(popupPlaceCard);
  popup.setListenersAfterOpenPopup();
  form.handleFormPlaceCard();
};

const handleOpenPopupProfile = () => {
  const popupProfile = document.querySelector(".popup_profile");
  const formProfile = popupProfile.querySelector(".popup__form");
  const formValidator = new FormValidator(formProfile);
  const popup = new Popup(popupProfile);
  const form = new FormProfile(formProfile, formValidator, popup);

  formProfile.name.value = userInfo.name;
  formProfile.description.value = userInfo.description;
  formValidator.setErrorMessageState(formProfile.name, "", true);
  formValidator.setErrorMessageState(formProfile.description, "", true);

  const isValidForm = formValidator
    .checkFormValidity()
    .every(item => item.valid);
  formValidator.setSubmitButtonState(isValidForm);

  popup.open(popupProfile);
  popup.setListenersAfterOpenPopup();
  form.handleFormProfile();
};

openPopupPlaceCardButton.addEventListener("click", handleOpenPopupPlaceCard);
editProfileButton.addEventListener("click", handleOpenPopupProfile);

cardList.renderCards();
