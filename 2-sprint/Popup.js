class Popup {
  constructor(popup) {
    this.popup = popup;
    this.closeButton = popup.querySelector(".popup__close");
  }
  open() {
    this.popup.classList.add("popup_is-opened");
  }

  close() {
    this.popup.classList.remove("popup_is-opened");
  }

  handleClosePopup = () => {
    this.form = this.popup.querySelector(".popup__form");

    this.close();
    if (this.form) {
      this.form.reset();
      const formValidator = new FormValidator(this.form);
      formValidator.setSubmitButtonState(false);
    }
    this.setListenersAfterClosePopup();
  };

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
