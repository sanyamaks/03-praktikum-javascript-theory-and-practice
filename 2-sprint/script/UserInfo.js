class UserInfo {
  constructor(name, description) {
    this.name = name.textContent;
    this.description = description.textContent;
  }

  /**
   * Можно лучше:
   * Хранить fullName и job в полях класса.
   */
  updateUserInfo(userInfo, fullName, job) {
    const { name, description } = userInfo;
    this.name = name;
    this.description = description;
    fullName.textContent = this.name;
    job.textContent = this.description;
  }
}
