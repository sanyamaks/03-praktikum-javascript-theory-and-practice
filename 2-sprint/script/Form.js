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
      /**
       * Можно лучше:
       * Не создавать Input, а просто описать обработчик инпута здесь и назначить его.
       * Создание отдельного класса Input усложняет код и, по сути, использует имеющийся код в FormValidator.
       */
      const inputObj = new Input(item, this.formValidator);
      item.addEventListener("input", inputObj.handleInput);
    });
  }

  handleSubmitForm(event) {
    event.preventDefault();
    this.isValidForm = this.formValidator.isValidForm;
  }
}
