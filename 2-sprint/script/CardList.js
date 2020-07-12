class CardList {
  constructor(placeList, createCard, api) {
    this.placesList = placeList;
    this.createCard = createCard;
    this.api = api;
  }
  renderCards(cards, userID) {
    this.userID = userID;
    this.cards = cards;
  /*REVIEW2. Отлично. Мне понравилось, что при рендере карточек Вы используете метод map, а не forEach. Массив, который возвращает метод map с DOM-элементами
  карточек, можно было бы использовать при расширении функций проекта для просмотра с фильтром (например, вы хотите просмотреть карточки только за какую-то дату),
  или сортировкой (например, по убыванию числа лайков). При этом хорошо, что этот массив создаётся вместе с первоначальным рендером карточек, а не в
  отдельном цикле, что могло бы замедлить работу программы при большом количестве карточек. */
    this.cards.map(cardsItem => this.addCard(cardsItem));
  }

  addCard(cardsItem) {
    const card = this.createCard(cardsItem);
    /*REVIEW2. Можно лучше. Думаю, в класс CardList лучше передавать не функцию, возвращающую экземпляр класса Card, а функцию, возвращающую элемент карточки для
    каждого экземпляра (сразу card.create), тогда бы классу CardList не надо было быть осведомлённым, что у класса Card есть метод create и эти классы были
    бы более незаисимы друг от друга. */
    const placeCard = card.create(this.userID, this.api);
    this.placesList.appendChild(placeCard);
  }
}
