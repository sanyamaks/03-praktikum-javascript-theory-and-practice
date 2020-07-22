class FormProfile extends Form {
  constructor(form, formValidator, popup, api, userInfo) {
    super(form, formValidator, popup, api);
    this.userInfo = userInfo;
  }
  onSubmit(name, about) {
    super.onSubmit();
    this.renderLoading(true);
    this.api
      .updateUserInfo({
        name: name.value,
        about: about.value
      })

      .then(userInfo => {
        this.userInfo.updateUserInfo(userInfo);
        this.closePopup();
      })
      .catch(err => console.log(err))
      .finally(() => this.renderLoading(false));
  }
}
