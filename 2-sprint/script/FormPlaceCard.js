class FormPlaceCard extends Form {
  constructor(form, formValidator, popup, cardList) {
    super(form, formValidator, popup);
    this.form = form;
    this.popup = popup;
    this.cardList = cardList;
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  handleSubmitForm(event) {
    super.handleSubmitForm(event);
    if (this.isValidForm) {
      const { name, link } = this.form.elements;
      // Надо исправить: не создавать экземпляры других классов
      // Надо исправить: не использовать глобальную переменную
      this.cardList.addCard(name.value, link.value);
      /**
       * Надо исправить:
       * 1. Лучше сохранить this.popup и здесь вызывать this.popup.close()
       * 2. Перенести сброс формы из handleClosePopup сюда.
       */
      this.formValidator.setSubmitButtonState(false);
      this.popup.close();
      this.form.reset();
      this.form.removeEventListener("submit", this.handleSubmitForm);
    }
  }
}
