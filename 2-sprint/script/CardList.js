class CardList {
  constructor(placeList, createCard) {
    this.placesList = placeList;
    this.createCard = createCard;
  }
  renderCards(cards) {
    console.log(cards);
    this.cards = cards;
    this.cards.map((cardsItem) => this.addCard(cardsItem));
  }

  addCard(cardsItem) {
    const card = this.createCard(cardsItem);
    const placeCard = card.create();
    this.placesList.appendChild(placeCard);
  }
}
