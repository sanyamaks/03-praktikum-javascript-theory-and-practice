class Card {
  constructor(name, link) {
    this.card = {};
    this.name = name;
    this.link = link;
    this.popupImage = document.querySelector(".popup_image");
    this.popup = new Popup(this.popupImage);
  }
  create() {
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

    placeCardImage.style.backgroundImage = `url(${this.link})`;
    placeCardName.textContent = `${this.name}`;

    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeCardDescription);
    placeCardImage.appendChild(placeCardDeleteIcon);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLikeIcon);

    this.card = placeCard;

    return this.card;
  }

  like = event => {
    event.currentTarget.classList.toggle("place-card__like-icon_liked");
  };

  remove = event => {
    event.target.closest(".places-list").removeChild(this.card);
  };

  handleOpenPopupImage = event => {
    if (event.target.classList.contains("place-card__image")) {
      const image = document.querySelector(".popup__image");
      const link = event.target.style.backgroundImage.slice(5, -2);

      image.src = link;

      this.popup.open();
      this.popup.setListenersAfterOpenPopup();
    }
  };

  setEventListeners(card) {
    card
      .querySelector(".place-card__image")
      .addEventListener("click", this.handleOpenPopupImage);
    card
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like);
    card
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", this.remove);
  }
}
