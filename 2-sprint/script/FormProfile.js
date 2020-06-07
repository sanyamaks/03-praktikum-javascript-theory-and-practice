class FormProfile extends Form {
  constructor(form, formValidator, popup, userInfo, api) {
    super(form, formValidator, popup);
    this.userInfo = userInfo;
    this.api = api;
  }
  onSubmit() {
    super.onSubmit();
    this.api.updateUserInfo(
      {
        name: name.value,
        about: about.value,
      }
    );
  }
}
