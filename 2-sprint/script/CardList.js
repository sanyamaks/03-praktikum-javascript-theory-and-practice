class CardList {
  constructor(placeList, initialCards) {
    this.placesList = placeList;
    this.cards = initialCards;
  }
  renderCards() {
    this.cards.map(cardsItem => {
      this.addCard(cardsItem.name, cardsItem.link);
    });
  }

  /**
   * Надо исправить:
   * Использование глобальной функции createCard
   * Следует передать ссылку на эту функцию параметром в конструктор класса CardList
   * и использовать this.createCard
   */
  addCard(name, link) {
    const card = createCard(name, link);
    const placeCard = card.create();
    this.placesList.appendChild(placeCard);
  }
}
