const openPopupPlaceCardButton = document.querySelector(
  ".button.user-info__button"
);
const openPopupProfileButton = document.querySelector(".user-info__edit");
const openPopupAvatarButton = document.querySelector(".user-info__photo");
const placeList = document.querySelector(".places-list");
const fullName = document.querySelector(".user-info__name");
const job = document.querySelector(".user-info__job");
const popupProfile = document.querySelector(".popup_profile");
const popupPlaceCard = document.querySelector(".popup_place-card");
const popupImage = document.querySelector(".popup_image");
const popupAvatar = document.querySelector(".popup_avatar");
const formProfile = popupProfile.querySelector(".popup__form");
const formPlaceCard = popupPlaceCard.querySelector(".popup__form");
const formAvatar = popupAvatar.querySelector(".popup__form");
const popupProfileObj = new Popup(popupProfile);
popupProfileObj.setCloseButtonListeners();
const popupPlaceCardObj = new Popup(popupPlaceCard);
popupPlaceCardObj.setCloseButtonListeners();
const popupImageObj = new Popup(popupImage);
popupImageObj.setCloseButtonListeners();
const popupAvatarObj = new Popup(popupAvatar);
popupAvatarObj.setCloseButtonListeners();
const formValidatorProfile = new FormValidator(formProfile);
const formValidatorPlaceCard = new FormValidator(formPlaceCard);
const formValidatorAvatar = new FormValidator(formAvatar);
const userInfo = new UserInfo(fullName, job);

const createCard = (card) => {
  return new Card(card, handleOpenPopupImage);
};

const cardList = new CardList(placeList, createCard);
const api = new Api(
  {
    baseUrl: "https://praktikum.tk/cohort11",
    headers: {
      authorization: "4f5e3621-964f-4d58-88fd-12f1d002534a",
      "Content-Type": "application/json",
    },
  },
  userInfo,
  cardList
);
const formProfileObj = new FormProfile(
  formProfile,
  formValidatorProfile,
  popupProfileObj,
  userInfo,
  api
);
formProfileObj.setEventListeners();
const formPlaceCardObj = new FormPlaceCard(
  formPlaceCard,
  formValidatorPlaceCard,
  popupPlaceCardObj,
  cardList
);
formPlaceCardObj.setEventListeners();
const formAvatarObj = new FormAvatar(
  formAvatar,
  formValidatorAvatar,
  popupAvatarObj
);
formAvatarObj.setEventListeners();

// api.updateUserInfo();
// api.addCard();
// api.removeCard("5edbe03c8b302e001f0be86c");
// api.putLike("5ed4c882a5831b001f2e976b");
// api.removeLike("5ed4c882a5831b001f2e976b");
// api.updateUserAvatar("https://twizz.ru/wp-content/uploads/2019/09/1569240341_18bdcbc66f6127d9909b58b7b0dbd14e.jpg");

function handleOpenPopupImage(event) {
  if (event.target.classList.contains("place-card__image")) {
    const link = event.target.style.backgroundImage.slice(5, -2);
    const image = popupImage.querySelector(".popup__image");

    image.src = link;

    popupImageObj.open();
  }
}

const handleOpenPopupPlaceCard = () => {
  formValidatorPlaceCard.resetErrorMessage();
  popupPlaceCardObj.open();
  formPlaceCardObj.setFocusOnFirstInput();
};

const handleOpenPopupProfile = () => {
  /**
   * Можно лучше:
   * Не обращаться к полям напрямую, а реализовать метод который вернет объект с информацией.
   * В терминологии ООП это называется геттер
   * Подробнее: https://learn.javascript.ru/private-protected-properties-methods
   *
   * Можно лучше:
   * defaultValue нужно изменять только при сохранении формы
   * (в handleSubmitForm класса FormProfile перед обновлением userInfo)
   */
  const { name, description } = { ...userInfo };
  formProfile.name.defaultValue = name;
  formProfile.description.defaultValue = description;
  formValidatorProfile.resetErrorMessage();
  popupProfileObj.open();
  formProfileObj.setFocusOnFirstInput();
};

const handleOpenPopupAvatar = () => {
  formValidatorAvatar.resetErrorMessage();
  popupAvatarObj.open();
  formAvatarObj.setFocusOnFirstInput();
};

openPopupPlaceCardButton.addEventListener("click", handleOpenPopupPlaceCard);
openPopupProfileButton.addEventListener("click", handleOpenPopupProfile);
openPopupAvatarButton.addEventListener("click", handleOpenPopupAvatar);

api.getUserInfo();
api.getInitialCards();
