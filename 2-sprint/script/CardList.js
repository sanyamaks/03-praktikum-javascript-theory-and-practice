class CardList {
  constructor() {
    /**
     * Надо исправить:
     * Использование глобальных переменных
     * Необходимо передать эти переменные параметрами в конструктор.
     */
    this.placesList = document.querySelector(".places-list");
    this.cards = initialCards;
  }
  renderCards() {
    this.cards.map((cardsItem, id) => {
      const card = new Card(cardsItem.name, cardsItem.link);
      const placeCard = card.create();
      /**
       * Можно лучше:
       * id не используется, поэтому это является лишним кодом.
       */
      placeCard.id = `${id}`;
      card.setEventListeners(placeCard);
      this.addCard(placeCard);
    });
  }
  addCard(card) {
    this.placesList.appendChild(card);
  }
}
