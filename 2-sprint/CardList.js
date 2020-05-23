class CardList {
  constructor(placesList, cards) {
    this.placesList = placesList;
    this.cards = cards;
  }
  renderCards() {
    this.placesList.innerHTML = "";
    this.cards.map((cardsItem, id) => {
      const placeCard = card.create(cardsItem);
      placeCard.id = `${id}`;
      card.setEventListeners(placeCard);
      placesList.appendChild(placeCard);
    });
  }
  addCard(card) {
    this.cards.push({ ...card });
  }
}
