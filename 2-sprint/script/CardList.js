class CardList {
  constructor(placeList, initialCards, handleOpenPopupImage) {
    /**
     * Надо исправить:
     * Использование глобальных переменных
     * Необходимо передать эти переменные параметрами в конструктор.
     */
    this.placesList = placeList;
    this.cards = initialCards;
    this.handleOpenPopupImage = handleOpenPopupImage;
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
    const card = new Card(name, link, handleOpenPopupImage);
    const placeCard = card.create();
    card.setEventListeners(placeCard);
    this.placesList.appendChild(placeCard);
  }
}
