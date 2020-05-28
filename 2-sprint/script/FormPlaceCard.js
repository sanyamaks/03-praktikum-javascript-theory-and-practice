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
      // Надо исправить: не создавать экземпляры других классов
      const card = new Card(name.value, link.value);
      const placeCard = card.create();
      card.setEventListeners(placeCard);
      // Надо исправить: не использовать глобальную переменную
      cardList.addCard(placeCard);
      /**
       * Надо исправить:
       * 1. Лучше сохранить this.popup и здесь вызывать this.popup.close()
       * 2. Перенести сброс формы из handleClosePopup сюда.
       */
      this.handleClosePopup();
      this.form.removeEventListener("submit", this.handleSubmitForm);
    }
  }
}
