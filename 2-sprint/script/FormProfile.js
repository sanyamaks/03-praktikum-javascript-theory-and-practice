class FormProfile extends Form {
  constructor(form, formValidator, popup, userInfo) {
    /**
     * Можно лучше:
     * Дублирование кода.
     * Строку
     * this.popup = popup
     * Следует перенести в конструктор
     */
    super(form, formValidator);
    this.popup = popup;
    this.userInfo = userInfo;
  }
  handleSubmitForm(event) {
    super.handleSubmitForm(event);
    if (this.formValidator.isValidForm()) {
      const { name, description } = this.form.elements;
      this.userInfo.updateUserInfo(
        {
          name: name.value,
          description: description.value
        },
        this.userInfo.fullName,
        this.userInfo.job
      );
      this.popup.close();
      this.form.reset();
      this.form.removeEventListener("submit", this.handleSubmitForm);
    }
  }
}
