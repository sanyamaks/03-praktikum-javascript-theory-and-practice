class Form {
  constructor(form, formValidator, popup) {
    this.form = form;
    this.formValidator = formValidator;
    this.popup = popup;
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  setFocusOnFirstInput() {
    this.form.querySelector("input").focus();
  }

  setEventListeners() {
    this.form.addEventListener("submit", this.handleSubmitForm);
    Array(...this.form.querySelectorAll("input")).forEach(item => {
      item.addEventListener("input", this.handleInput);
    });
  }

  handleInput(event) {
    this.formValidator.setSubmitButtonState(this.formValidator.isValidForm());
    const { errorMessage, valid } = this.formValidator.checkInputValidity(
      event.target
    );
    this.formValidator.setErrorMessageState(event.target, errorMessage, valid);
  }

  handleSubmitForm = evt => {
    evt.preventDefault();
    if (this.formValidator.isValidForm()) {
      this.onSubmit(...this.form.elements);
      this.popup.close();
      this.form.reset();
    }
  };
  onSubmit() {}
}
