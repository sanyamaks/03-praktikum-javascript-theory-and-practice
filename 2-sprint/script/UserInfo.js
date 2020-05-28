class UserInfo {
  constructor() {
    /**
     * Надо исправить:
     * Использование глобальных переменных.
     * Необходимо передать значения параметрами в конструктор.
     */
    this.name = document.querySelector(".user-info__name").textContent;
    this.description = document.querySelector(".user-info__job").textContent;
  }

  /**
   * Надо исправить:
   * 1. Использование глобальных переменных.
   * 2. Объединить updateUserInfo и setUserInfo в одну функцию, т.к. они вызываются вместе.
   */
  updateUserInfo() {
    const fullName = document.querySelector(".user-info__name");
    const job = document.querySelector(".user-info__job");

    fullName.textContent = this.name;
    job.textContent = this.description;
  }

  setUserInfo(userInfo) {
    const { name, description } = userInfo;
    this.name = name;
    this.description = description;
  }
}
