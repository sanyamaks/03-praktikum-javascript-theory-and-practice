class Form {
  constructor(form, formValidator) {
    this.form = form;
    this.formValidator = formValidator;
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleForm() {
    this.form.querySelector("input").focus();
    this.setEventListenersFormProfile();
  }

  setEventListenersFormProfile() {
    this.form.addEventListener("submit", this.handleSubmitForm);
    Array(...this.form.querySelectorAll("input")).forEach(item => {
      /**
       * Можно лучше:
       * Не создавать Input, а просто описать обработчик инпута здесь и назначить его.
       * Создание отдельного класса Input усложняет код и, по сути, использует имеющийся код в FormValidator.
       */
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
