class Card {
  constructor(cardInfo, handleOpenPopupImage) {
    this.card = null;
    this.cardInfo = cardInfo;
    this.handleOpenPopupImage = handleOpenPopupImage;
  }
  create(userID, api) {
    this.userID = userID;
    this.api = api;
    const placeCard = document.createElement("div");
    const placeCardImage = document.createElement("div");
    const placeCardDeleteIcon = document.createElement("button");
    const placeCardDescription = document.createElement("div");
    const placeCardName = document.createElement("h3");
    const placeCardLikeContainer = document.createElement("div");
    const placeCardLikeIcon = document.createElement("button");
    const placeCardNumberLikes = document.createElement("p");

    placeCard.classList.add("place-card");
    placeCard.classList.add("places-list__place-card");
    placeCardImage.classList.add("place-card__image");
    placeCardDeleteIcon.classList.add("place-card__delete-icon");
    placeCardDescription.classList.add("place-card__description");
    placeCardName.classList.add("place-card__name");
    placeCardLikeContainer.classList.add("place-card__like-container");
    placeCardLikeIcon.classList.add("place-card__like-icon");
    placeCardNumberLikes.classList.add("place-card__number-likes");

    placeCardImage.style.backgroundImage = `url(${this.cardInfo.link})`;
    placeCardName.textContent = `${this.cardInfo.name}`;
    placeCardNumberLikes.textContent = `${this.cardInfo.likes.length}`;
    if (this.isLike()) {
      placeCardLikeIcon.classList.toggle("place-card__like-icon_liked");
    }

    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeCardDescription);
    placeCardImage.appendChild(placeCardDeleteIcon);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLikeContainer);
    placeCardLikeContainer.appendChild(placeCardLikeIcon);
    placeCardLikeContainer.appendChild(placeCardNumberLikes);

    this.card = placeCard;
    this.setEventListeners();
    this.setRemoveButton();
    return this.card;
  }

  like = (event) => {
    console.log(this.isLike());
    if (!this.isLike()) {
      this.api.putLike(this);
      event.currentTarget.classList.add("place-card__like-icon_liked");
    } else {
      this.api.removeLike(this);
      event.currentTarget.classList.remove("place-card__like-icon_liked");
    }
  };

  changeNumberLikes(cardInfo) {
    this.cardInfo = cardInfo;
    this.card.querySelector(
      ".place-card__number-likes"
    ).textContent = `${this.cardInfo.likes.length}`;
  }

  remove = () => {
    this.api.removeCard(this);
    this.card.remove();
    this.removeEventListeners();
    this.card = null;
  };

  setEventListeners() {
    this.card
      .querySelector(".place-card__image")
      .addEventListener("click", this.handleOpenPopupImage);
    this.card
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like);
    this.card
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", this.remove);
  }

  removeEventListeners() {
    this.card
      .querySelector(".place-card__image")
      .removeEventListener("click", this.handleOpenPopupImage);
    this.card
      .querySelector(".place-card__like-icon")
      .removeEventListener("click", this.like);
    this.card
      .querySelector(".place-card__delete-icon")
      .removeEventListener("click", this.remove);
  }

  setRemoveButton() {
    if (this.cardInfo.owner._id === this.userID) {
      this.card
        .querySelector(".place-card__delete-icon")
        .classList.add("place-card__delete-icon_enable");
    }
  }

  isLike() {
    return this.cardInfo.likes.some((item) => item._id === this.userID);
  }
}
