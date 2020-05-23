class FormProfile {
  constructor(form, formValidator, popup) {
    this.form = form;
    this.handleClosePopup = popup.handleClosePopup;
    this.formValidator = formValidator;
  }

  handleFormProfile() {
    this.form.name.focus();
    this.setEventListenersFormProfile();
  }

  setEventListenersFormProfile() {
    this.form.addEventListener("submit", this.handleSubmitFormProfile);
    const inputName = new Input(this.form.name, this.form, this.formValidator);
    this.form.name.addEventListener("input", inputName.handleInput);
    const inputDescription = new Input(
      this.form.description,
      this.form,
      this.formValidator
    );
    this.form.description.addEventListener(
      "input",
      inputDescription.handleInput
    );
  }

  handleSubmitFormProfile = event => {
    event.preventDefault();
    const formValidator = new FormValidator(this.form);
    const isValidForm = formValidator
      .checkFormValidity()
      .every(item => item.valid);

    if (!isValidForm) {
      return null;
    } else {
      const { name, description } = this.form.elements;
      userInfo.setUserInfo({
        name: name.value,
        description: description.value
      });
      userInfo.updateUserInfo();
      formValidator.setSubmitButtonState(false);
      this.handleClosePopup();
      this.form.removeEventListener("submit", this.handleSubmitFormProfile);
    }
  };
}
