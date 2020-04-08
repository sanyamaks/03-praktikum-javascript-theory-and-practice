let initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  },
  {
    name: "Нургуш",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg"
  },
  {
    name: "Тулиновка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg"
  },
  {
    name: "Остров Желтухина",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg"
  },
  {
    name: "Владивосток",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg"
  }
];
const placesList = document.querySelector(".places-list");
const openPopupButton = document.querySelector(".button.user-info__button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close");

const renderCards = () => {
  placesList.innerHTML = "";
  initialCards.map((card, id) => {
    const placeCard = createCard(card.name, card.link, id);
    placesList.appendChild(placeCard);
  });
};

const createCard = (cardName, urlImage, idCard) => {
  const placeCard = document.createElement("div");
  const placeCardImage = document.createElement("div");
  const placeCardDeleteIcon = document.createElement("button");
  const placeCardDescription = document.createElement("div");
  const placeCardName = document.createElement("h3");
  const placeCardLikeIcon = document.createElement("button");

  placeCard.classList.add("place-card");
  placeCard.classList.add("places-list__place-card");
  placeCardImage.classList.add("place-card__image");
  placeCardDeleteIcon.classList.add("place-card__delete-icon");
  placeCardDescription.classList.add("place-card__description");
  placeCardName.classList.add("place-card__name");
  placeCardLikeIcon.classList.add("place-card__like-icon");

  placeCard.id = idCard;
  placeCardImage.style.backgroundImage = `url(${urlImage})`;
  placeCardName.textContent = `${cardName}`;

  placeCard.appendChild(placeCardImage);
  placeCard.appendChild(placeCardDescription);
  placeCardImage.appendChild(placeCardDeleteIcon);
  placeCardDescription.appendChild(placeCardName);
  placeCardDescription.appendChild(placeCardLikeIcon);

  return placeCard;
};

const openPopup = () => {
  const form = document.forms.new;
  popup.classList.add("popup_is-opened");
  openPopupButton.removeEventListener("click", openPopup);
  closePopupButton.addEventListener("click", closePopup);
  form.addEventListener("submit", addChild);
  form.name.focus();
};

const closePopup = () => {
  popup.classList.remove("popup_is-opened");
  openPopupButton.addEventListener("click", openPopup);
  closePopupButton.removeEventListener("click", closePopup);
};

const clickLike = event => {
  if (event.target.classList.contains("place-card__like-icon")) {
    event.target.classList.toggle("place-card__like-icon_liked");
  }
};

const addChild = function(event) {
  const name = this.elements.name;
  const link = this.elements.link;
  if (name.value !== "" && link.value !== "") {
    event.preventDefault();
    initialCards.push({ name: name.value, link: link.value });
    this.reset();
    closePopup();
    renderCards();
    this.removeEventListener("submit", addChild);
  } else {
    event.preventDefault();
  }
};

const removeChild = event => {
  if (event.target.classList.contains("place-card__delete-icon")) {
    const id = event.target.parentElement.parentElement.id;
    initialCards.splice(id, 1);
    renderCards();
  }
};

const handleClickPlaceList = event => {
  clickLike(event);
  removeChild(event);
};

openPopupButton.addEventListener("click", openPopup);
placesList.addEventListener("click", handleClickPlaceList);

renderCards();
