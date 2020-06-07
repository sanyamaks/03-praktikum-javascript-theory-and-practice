class FormPlaceCard extends Form {
  constructor(form, formValidator, popup) {
    super(form, formValidator, popup, api);
  }
  onSubmit(name, link) {
    super.onSubmit();
    this.api.addCard({ name: name.value, link: link.value }, this);
  }
}
