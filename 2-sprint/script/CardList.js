class CardList {
  constructor(placeList, initialCards, createCard) {
    this.placesList = placeList;
    this.cards = initialCards;
    this.createCard = createCard;
  }
  renderCards() {
    this.cards.map(cardsItem => {
      this.addCard(cardsItem.name, cardsItem.link);
    });
  }

  addCard(name, link) {
    const card = this.createCard(name, link);
    const placeCard = card.create();
    this.placesList.appendChild(placeCard);
  }
}
