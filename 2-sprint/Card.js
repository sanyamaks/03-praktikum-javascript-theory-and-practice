class Card {
  contructor() {}

  create({ name, link }) {
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

    placeCardImage.style.backgroundImage = `url(${link})`;
    placeCardName.textContent = `${name}`;

    placeCard.appendChild(placeCardImage);
    placeCard.appendChild(placeCardDescription);
    placeCardImage.appendChild(placeCardDeleteIcon);
    placeCardDescription.appendChild(placeCardName);
    placeCardDescription.appendChild(placeCardLikeIcon);

    return placeCard;
  }

  like = event => {
    event.currentTarget.classList.toggle("place-card__like-icon_liked");
  };

  remove = event => {
    const id = event.target.closest(".place-card").id;
    initialCards.splice(id, 1);
    cardList.renderCards();
  };

  showImage = event => {
    if (event.target.classList.contains("place-card__image")) {
      const id = event.target.closest(".place-card").id;
      this.handleOpenPopupImage(id);
    }
  };

  handleOpenPopupImage(id) {
    const popupImage = document.querySelector(".popup_image");
    const image = document.querySelector(".popup__image");
    const popup = new Popup(popupImage);

    image.src = initialCards[id].link;

    popup.open(popupImage);
    popup.setListenersAfterOpenPopup();
  }

  setEventListeners(card) {
    card
      .querySelector(".place-card__image")
      .addEventListener("click", this.showImage);
    card
      .querySelector(".place-card__like-icon")
      .addEventListener("click", this.like);
    card
      .querySelector(".place-card__delete-icon")
      .addEventListener("click", this.remove);
  }
}
