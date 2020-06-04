class FormProfile extends Form {
  constructor(form, formValidator, popup, userInfo) {
    super(form, formValidator, popup);
    this.userInfo = userInfo;
  }
  onSubmit(name, description) {
    super.onSubmit();
    this.userInfo.updateUserInfo(
      {
        name: name.value,
        description: description.value
      },
      this.userInfo.fullName,
      this.userInfo.job
    );
  }
}
