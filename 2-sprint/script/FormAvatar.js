class FormAvatar extends Form {
  constructor(form, formValidator, popup, api, userInfo) {
    super(form, formValidator, popup, api);
    this.userInfo = userInfo;
  }
  onSubmit(link) {
    super.onSubmit();
    this.renderLoading(true);
    this.api
      .updateUserAvatar({ avatar: link.value })
      .then(avatar => {
        this.userInfo.updateUserAvatar(avatar);
        this.closePopup();
      })
      .catch(err => console.log(err))
      .finally(() => this.renderLoading(false));
  }
}
