class FormAvatar extends Form {
  constructor(form, formValidator, popup, api) {
    super(form, formValidator, popup, api);
  }
  onSubmit(link) {
    super.onSubmit();
    this.api.updateUserAvatar({avatar: link.value}, this);
  }
}
