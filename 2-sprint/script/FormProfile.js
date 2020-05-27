class FormProfile extends Form {
  constructor(form, formValidator, popup, userInfo) {
    super(form, formValidator, popup, userInfo);
    this.form = form;
    this.handleClosePopup = popup.handleClosePopup;
    this.formValidator = formValidator;
    this.userInfo = userInfo;
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  handleSubmitForm(event) {
    super.handleSubmitForm(event);
    if (this.isValidForm) {
      const { name, description } = this.form.elements;
      this.userInfo.setUserInfo({
        name: name.value,
        description: description.value
      });
      this.userInfo.updateUserInfo();
      this.formValidator.setSubmitButtonState(false);
      this.handleClosePopup();
      this.form.removeEventListener("submit", this.handleSubmitForm);
    }
  }
}
