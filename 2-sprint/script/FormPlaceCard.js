class FormPlaceCard extends Form {
  constructor(form, formValidator, popup, cardList) {
    super(form, formValidator, popup);
    this.cardList = cardList;
  }
  onSubmit(name, link) {
    super.onSubmit();
    this.cardList.addCard(name.value, link.value);
  }
}
