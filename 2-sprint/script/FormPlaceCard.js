class FormPlaceCard extends Form {
  constructor(form, formValidator, popup, userInfo) {
    super(form, formValidator, popup, userInfo);
    this.form = form;
    this.handleClosePopup = popup.handleClosePopup;
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  handleSubmitForm(event) {
    super.handleSubmitForm(event);
    if (this.isValidForm) {
      const { name, link } = this.form.elements;
      const card = new Card(name.value, link.value);
      const placeCard = card.create();
      card.setEventListeners(placeCard);
      cardList.addCard(placeCard);
      this.handleClosePopup();
      this.form.removeEventListener("submit", this.handleSubmitForm);
    }
  }
}
