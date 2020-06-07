class FormAvatar extends Form {
  constructor(form, formValidator, popup) {
    super(form, formValidator, popup);
  }
  onSubmit() {
    super.onSubmit();
    console.log(1);
  }
}
