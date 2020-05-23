class FormPlaceCard {
  constructor(form, formValidator, popup) {
    this.form = form;
    this.handleClosePopup = popup.handleClosePopup;
    this.formValidator = formValidator;
  }

  handleFormPlaceCard() {
    this.form.name.focus();
    this.setEventListenersFormPlaceCard();
  }

  setEventListenersFormPlaceCard() {
    this.form.addEventListener("submit", this.handleSubmitPlaceCard);
    const inputName = new Input(this.form.name, this.form, this.formValidator);
    this.form.name.addEventListener("input", inputName.handleInput);
    const inputLink = new Input(this.form.link, this.form, this.formValidator);
    this.form.link.addEventListener("input", inputLink.handleInput);
  }

  handleSubmitPlaceCard = event => {
    event.preventDefault();
    const formValidator = new FormValidator(this.form);
    const isValidForm = formValidator
      .checkFormValidity()
      .every(item => item.valid);

    if (!isValidForm) {
      return null;
    } else {
      const { name, link } = this.form.elements;
      cardList.addCard({ name: name.value, link: link.value });
      this.handleClosePopup();
      cardList.renderCards();
      this.form.removeEventListener("submit", this.handleSubmitPlaceCard);
    }
  };
}
