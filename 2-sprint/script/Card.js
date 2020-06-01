class Card {
  constructor(name, link, handleOpenPopupImage) {
    this.card = null; // Можно лучше: null либо не объявлять свойство
    this.name = name;
    this.link = link;
    this.handleOpenPopupImage = handleOpenPopupImage;
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
    this.setEventListeners(this.card);
    return this.card;
  }

  like = event => {
    event.currentTarget.classList.toggle("place-card__like-icon_liked");
  };

  remove = event => {
    event.target.closest(".places-list").removeChild(this.card);
    this.card
      .querySelector(".place-card__image")
      .removeEventListener("click", this.handleOpenPopupImage);
    this.card
      .querySelector(".place-card__like-icon")
      .removeEventListener("click", this.like);
    this.card
      .querySelector(".place-card__delete-icon")
      .removeEventListener("click", this.remove);
    console.log(this.card);
    this.card = null;
    /**
     * Можно лучше:
     * this.card = null;
     * Таким образом сборщик мусора сможет удалить из памяти этот элемент, т.к. мы больше не храним ссылок на него.
     * Также еще можно удалять обработчики с this.card.
     */
  };

  /**
   * Можно лучше:
   * Вместо card использовать this.card
   */
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
}
