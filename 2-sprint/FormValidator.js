class FormValidator {
  constructor(form) {
    this.form = form;
  }

  checkFormValidity = () => {
    const elements = Array.from(this.form.elements);
    return elements.reduce((arr, item) => {
      if (item.tagName === "INPUT") {
        arr.push(this.checkInputValidity(item));
        return arr;
      }
      return arr;
    }, []);
  };

  checkInputValidity = input => {
    let valid = true;
    let errorMessage = "";
    if (input.validity.valueMissing) {
      valid = false;
      errorMessage = errorMessages.requiredField;
    } else if (input.type === "url" && input.validity.patternMismatch) {
      valid = false;
      errorMessage = errorMessages.noLink;
    } else if (input.validity.tooLong || input.validity.tooShort) {
      valid = false;
      errorMessage = errorMessages.specifiedInterval;
    } else {
      errorMessage = "";
    }
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
    input.setCustomValidity(errorMessage);
    promptText.textContent = input.validationMessage;
    if (!valid) {
      promptText.classList.add("popup__error-message_show");
    } else {
      promptText.classList.remove("popup__error-message_show");
    }
  };
}
