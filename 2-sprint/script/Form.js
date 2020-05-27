class Form {
  constructor(form, formValidator, popup) {
    this.form = form;
    this.handleClosePopup = popup.handleClosePopup;
    this.formValidator = formValidator;
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  handleForm() {
    this.form.querySelector("input").focus();
    this.setEventListenersFormProfile();
  }

  setEventListenersFormProfile() {
    this.form.addEventListener("submit", this.handleSubmitForm);
    Array(...this.form.querySelectorAll("input")).forEach(item => {
      const inputObj = new Input(item, this.formValidator);
      item.addEventListener("input", inputObj.handleInput);
      console.log(item.validationMessage);
    });
  }

  handleSubmitForm(event) {
    event.preventDefault();
    this.isValidForm = this.formValidator
      .checkFormValidity()
      .every(item => item.valid);
  }
}
