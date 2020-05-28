class FormProfile extends Form {
  constructor(form, formValidator, popup, userInfo, fullName, job) {
    super(form, formValidator, popup, userInfo);
    this.form = form;
    this.popup = popup;
    this.formValidator = formValidator;
    this.userInfo = userInfo;
    this.fullName = fullName;
    this.job = job;
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }
  handleSubmitForm(event) {
    super.handleSubmitForm(event);
    if (this.isValidForm) {
      const { name, description } = this.form.elements;
      this.userInfo.updateUserInfo(
        {
          name: name.value,
          description: description.value
        },
        this.fullName,
        this.job
      );
      this.formValidator.setSubmitButtonState(false);
      this.popup.close();
      this.form.reset();
      this.form.removeEventListener("submit", this.handleSubmitForm);
    }
  }
}
