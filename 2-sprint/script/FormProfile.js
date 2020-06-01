class FormProfile extends Form {
  constructor(form, formValidator, popup, userInfo) {
    /**
     * Надо исправить:
     * Дублирование кода.
     * Строки
     * this.form = form;
     * this.formValidator = formValidator;
     * this.handleSubmitForm = this.handleSubmitForm.bind(this);
     * Следует перенести в конструктор
     * Если перенести fullName и job в класс UserInfo, то в этом классе необходимо будет только запомнить userInfo
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
