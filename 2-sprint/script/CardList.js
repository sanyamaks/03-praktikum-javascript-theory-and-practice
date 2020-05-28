class CardList {
  constructor(placeList, initialCards) {
    /**
     * Надо исправить:
     * Использование глобальных переменных
     * Необходимо передать эти переменные параметрами в конструктор.
     */
    this.placesList = placeList;
    this.cards = initialCards;
  }
  renderCards() {
    this.cards.map(cardsItem => {
      const card = new Card(cardsItem.name, cardsItem.link);
      const placeCard = card.create();
      /**
       * Можно лучше:
       * id не используется, поэтому это является лишним кодом.
       */
      card.setEventListeners(placeCard);
      this.addCard(placeCard);
    });
  }
  addCard(card) {
    this.placesList.appendChild(card);
  }
}
