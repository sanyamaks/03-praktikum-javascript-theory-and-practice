class CardList {
  constructor() {
    this.placesList = document.querySelector(".places-list");
    this.cards = initialCards;
  }
  renderCards() {
    this.cards.map((cardsItem, id) => {
      const card = new Card(cardsItem.name, cardsItem.link);
      const placeCard = card.create();
      placeCard.id = `${id}`;
      card.setEventListeners(placeCard);
      this.addCard(placeCard);
    });
  }
  addCard(card) {
    this.placesList.appendChild(card);
  }
}
