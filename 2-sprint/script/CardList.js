class CardList {
  constructor(placeList, createCard, api) {
    this.placesList = placeList;
    this.createCard = createCard;
    this.api = api;
  }
  renderCards(cards, userID) {
    this.userID = userID;
    this.cards = cards;
    this.cards.map(cardsItem => this.addCard(cardsItem));
  }

  addCard(cardsItem) {
    const card = this.createCard(cardsItem);
    const placeCard = card.create(this.userID, this.api);
    this.placesList.appendChild(placeCard);
  }
}
