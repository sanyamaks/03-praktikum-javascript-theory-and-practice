class Input {
  /**
   * Надо исправить
   * Параметр form никогда не используется.
   */
  constructor(input, formValidator) {
    this.input = input;
    /**
     * Можно лучше:
     * Проще сохранить весь formValidator
     */
    this.formValidator = formValidator;
  }
  handleInput = () => {
    const isValidForm = this.formValidator.checkFormValidity().every(item => item.valid);
    this.formValidator.setSubmitButtonState(isValidForm);
    const { errorMessage, valid } = this.formValidator.checkInputValidity(this.input);
    this.formValidator.setErrorMessageState(this.input, errorMessage, valid);
  };
}
