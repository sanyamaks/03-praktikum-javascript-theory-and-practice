class Popup {
  constructor(popup) {
    this.popup = popup;
    this.closeButton = this.popup.querySelector(".popup__close");
  }
  open() {
    this.popup.classList.add("popup_is-opened");
  }

  close = () => {
    this.popup.classList.remove("popup_is-opened");
  };

  setCloseButtonListeners = () => {
    this.closeButton.addEventListener("click", this.close);
  };
}
