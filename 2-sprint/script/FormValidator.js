class FormValidator {
  constructor(form) {
    this.form = form;
  }

  checkFormValidity = () => {
    /**
     * Можно лучше:
     * Чтобы не проверять на то, является ли элемент input'ом, можно сразу выбрать только те элементы, которые
     * имеют класс .popup__input с помощью this.form.querySelectorAll()
     */
    const elements = Array.from(this.form.querySelectorAll("input"));
    return elements.reduce((arr, item) => {
      arr.push(this.checkInputValidity(item));
      return arr;
    }, []);
  };

  checkInputValidity = input => {
    /**
     * Можно успростить:
     * Данный код имеет избыточную логику - если errorMessage не пустое, то инпут не валиден.
     */
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

  resetErrorMessage = input => {
    input.setCustomValidity("");
    this.setErrorMessageState(input, "", true);
  };
}
