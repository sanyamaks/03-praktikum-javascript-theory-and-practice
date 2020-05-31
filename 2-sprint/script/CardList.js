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
      /**
       * Можно лучше:
       * id не используется, поэтому это является лишним кодом.
       */
      this.addCard(cardsItem.name, cardsItem.link);
    });
  }
  addCard(name, link) {
    const card = createCard(name, link);
    const placeCard = card.create();
    this.placesList.appendChild(placeCard);
  }
}
