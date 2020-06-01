class FormValidator {
  constructor(form) {
    this.form = form;
  }

  checkFormValidity = () => {
    const elements = Array.from(this.form.querySelectorAll("input"));
    return elements.reduce((arr, item) => {
      arr.push(this.checkInputValidity(item));
      return arr;
    }, []);
  };

  checkInputValidity = input => {
    let errorMessage = "";
    if (input.validity.valueMissing) {
      errorMessage = errorMessages.requiredField;
    } else if (input.type === "url" && input.validity.patternMismatch) {
      errorMessage = errorMessages.noLink;
    } else if (input.validity.tooLong || input.validity.tooShort) {
      errorMessage = errorMessages.specifiedInterval;
    } else {
      errorMessage = "";
    }
    input.setCustomValidity(errorMessage);
    let valid = !input.validationMessage;
    return { input, valid, errorMessage };
  };

  setSubmitButtonState = valid => {
    const button = this.form.querySelector(".button");
    if (valid) {
      button.classList.add("popup__button_valid");
    } else {
      button.classList.remove("popup__button_valid");
    }
  };

  setErrorMessageState = (input, errorMessage, valid) => {
    const promptText = input
      .closest(".popup__container")
      .querySelector(".popup__error-message");
    promptText.textContent = input.validationMessage;
    if (!valid) {
      promptText.classList.add("popup__error-message_show");
    } else {
      promptText.classList.remove("popup__error-message_show");
    }
  };

  resetErrorMessage = () => {
    const elements = Array.from(this.form.querySelectorAll("input"));
    elements.forEach(element => {
      element.setCustomValidity("");
      this.setErrorMessageState(element, "", true);
    });
    this.form.reset();
  };

  isValidForm = () => {
    return this.checkFormValidity().every(item => item.valid);
  };
}
