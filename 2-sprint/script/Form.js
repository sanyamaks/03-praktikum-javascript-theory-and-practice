class Form {
  constructor(form, formValidator) {
    this.form = form;
    this.formValidator = formValidator;
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  setFocusOnFirstInput() {
    console.log("focus");
    this.form.querySelector("input").focus();
  }

  /**
   * Можно лучше:
   * setFormEventListeners,
   * Так как этот метод применяется для любой формы.
   */
  setEventListeners() {
    console.log("listeners");
    this.form.addEventListener("submit", () => this.handleSubmitForm(event));
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

  handleSubmitForm(event) {
    event.preventDefault();
  }
}
