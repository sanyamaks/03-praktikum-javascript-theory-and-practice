class Popup {
  constructor(popup) {
    this.popup = popup;
    /**
     * Можно лучше:
     * Для поддержания единого стиля необходимо выбрать что-то одно: popup или this.popup
     */
    this.closeButton = this.popup.querySelector(".popup__close");
  }
  open() {
    this.popup.classList.add("popup_is-opened");
  }

  close = () => {
    this.popup.classList.remove("popup_is-opened");
  };

  /**
   * Надо исправить:
   * Как писал в script.js, необходимо один раз назначать обработчики и не удалять их.
   * Это сильно упростит код, но не сделает его не надежным, т.к. случаи когда открываем открытый попап
   * или закрываем закрытый невозможно из-за специфики верстки.
   */
  setCloseButtonListeners = () => {
    this.closeButton.addEventListener("click", this.close);
  };

}
