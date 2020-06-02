class Form {
  constructor(form, formValidator) {
    this.form = form;
    this.formValidator = formValidator;
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  setFocusOnFirstInput() {
    /**
     * Можно лучше:
     * Убрать отладочный вывод в консоль
     */
    console.log("focus");
    this.form.querySelector("input").focus();
  }

  setEventListeners() {
    /**
     * Можно лучше:
     * Убрать отладочный вывод в консоль
     */
    console.log("listeners");
    /**
     * Можно лучше:
     * Не использовать глобальный event
     * Варианты, которые допустимы:
     * this.form.addEventListener("submit", this.handleSubmitForm); - предпочтительный
     * this.form.addEventListener("submit", (event) => this.handleSubmitForm(event));
     */
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
