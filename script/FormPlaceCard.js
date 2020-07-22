class FormPlaceCard extends Form {
  constructor(form, formValidator, popup, api, cardList) {
    super(form, formValidator, popup, api);
    this.cardList = cardList;
  }
  onSubmit(name, link) {
    super.onSubmit();
    this.renderLoading(true);
    this.api
      .addCard({ name: name.value, link: link.value })
      .then(card => {
        this.cardList.addCard(card);
        this.closePopup();
      })
      .catch(err => console.log(err))
      .finally(() => this.renderLoading(false));
  }
}
