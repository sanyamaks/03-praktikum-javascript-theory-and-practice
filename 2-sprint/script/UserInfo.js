class UserInfo {
  constructor(name, description) {
    /**
     * Надо исправить:
     * Использование глобальных переменных.
     * Необходимо передать значения параметрами в конструктор.
     */
    this.name = name.textContent;
    this.description = description.textContent;
  }

  /**
   * Надо исправить:
   * 1. Использование глобальных переменных.
   * 2. Объединить updateUserInfo и setUserInfo в одну функцию, т.к. они вызываются вместе.
   */
  updateUserInfo(userInfo, fullName, job) {
    const { name, description } = userInfo;
    this.name = name;
    this.description = description;
    fullName.textContent = this.name;
    job.textContent = this.description;
  }
}
