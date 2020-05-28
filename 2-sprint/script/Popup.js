class Popup {
  constructor(popup) {
    this.popup = popup;
    /**
     * Можно лучше:
     * Для поддержания единого стиля необходимо выбрать что-то одно: popup или this.popup
     */
    this.closeButton = popup.querySelector(".popup__close");
    this.form = this.popup.querySelector(".popup__form");
  }
  open() {
    this.popup.classList.add("popup_is-opened");
  }

  close() {
    this.popup.classList.remove("popup_is-opened");
  }

  handleClosePopup = () => {
    /**
     * Надо исправить:
     * Лишний код: сброс формы необходимо делать там, где вызывается эта функция.
     */
    this.close();
    if (this.form) {
      this.form.reset();
      const formValidator = new FormValidator(this.form);
      formValidator.setSubmitButtonState(false);
    }
    this.setListenersAfterClosePopup();
  };

  /**
   * Надо исправить:
   * Как писал в script.js, необходимо один раз назначать обработчики и не удалять их.
   * Это сильно упростит код, но не сделает его не надежным, т.к. случаи когда открываем открытый попап
   * или закрываем закрытый невозможно из-за специфики верстки.
   */
  setListenersAfterClosePopup = () => {
    this.closeButton.removeEventListener("click", this.handleClosePopup);
    openPopupPlaceCardButton.addEventListener(
      "click",
      handleOpenPopupPlaceCard
    );
    editProfileButton.addEventListener("click", handleOpenPopupProfile);
  };

  setListenersAfterOpenPopup = () => {
    openPopupPlaceCardButton.removeEventListener(
      "click",
      handleOpenPopupPlaceCard
    );
    editProfileButton.removeEventListener("click", handleOpenPopupProfile);
    this.closeButton.addEventListener("click", this.handleClosePopup);
  };
}
