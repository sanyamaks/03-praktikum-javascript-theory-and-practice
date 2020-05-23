class Input {
  constructor(input, form, formValidator) {
    this.input = input;
    this.setErrorMessageState = formValidator.setErrorMessageState;
    this.checkInputValidity = formValidator.checkInputValidity;
    this.checkFormValidity = formValidator.checkFormValidity;
    this.setSubmitButtonState = formValidator.setSubmitButtonState;
  }
  handleInput = () => {
    const isValidForm = this.checkFormValidity().every(item => item.valid);
    this.setSubmitButtonState(isValidForm);
    const { errorMessage, valid } = this.checkInputValidity(this.input);
    this.setErrorMessageState(this.input, errorMessage, valid);
  };
}
