class FormProfile extends Form {
  constructor(form, formValidator, popup, api) {
    super(form, formValidator, popup, api);
  }
  onSubmit(name, about) {
    super.onSubmit();
    this.api.updateUserInfo(
      {
        name: name.value,
        about: about.value
      },
      this
    );
  }
}
