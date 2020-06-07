class CardList {
  constructor(placeList, createCard) {
    this.placesList = placeList;
    this.createCard = createCard;
  }
  renderCards(cards, userID, api) {
    this.userID = userID;
    this.api = api;
    this.cards = cards;
    this.cards.map((cardsItem) => this.addCard(cardsItem));
  }

  addCard(cardsItem) {
    const card = this.createCard(cardsItem);
    const placeCard = card.create(this.userID, this.api);
    this.placesList.appendChild(placeCard);
  }
}
