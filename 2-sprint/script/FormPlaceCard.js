class FormPlaceCard extends Form {
  constructor(form, formValidator, popup, cardList) {
    /**
     * Можно лучше:
     * Дублирование кода.
     * Строку
     * this.popup = popup
     * Следует перенести в конструктор
     */
    super(form, formValidator);
    this.popup = popup;
    this.cardList = cardList;
  }
  handleSubmitForm(event) {
    super.handleSubmitForm(event);
    if (this.formValidator.isValidForm()) {
      const { name, link } = this.form.elements;
      this.cardList.addCard(name.value, link.value);
      /**
       * Можно лучше:
       * Дублирование кода.
       * Можно вынести в класс Form в метод afterSubmit(название примерное) и вызывать его с помощью super.
       *
       * Еще лучше:
       * Перенести весь код внутрь Form, но в теле вызывать this.onSubmit(название примерное), описать его пустым
       * и уже реализовать в дочерних классах.
       * Пример:
       * class Button {
       *   handleClick() {
       *     ...какие-то действия...
       *     this.onClick()
       *     ...какие-то действия...
       *   }
       *   onClick() {}
       * }
       *
       * class AlertButton extends Button {
       *   onClick() {
       *     alert('clicked!');
       *   }
       * }
       */
      this.popup.close();
      this.form.reset();
      this.form.removeEventListener("submit", this.handleSubmitForm);
    }
  }
}
