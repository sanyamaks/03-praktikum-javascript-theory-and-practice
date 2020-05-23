class UserInfo {
  constructor() {
    this.name = fullName.textContent;
    this.description = job.textContent;
  }

  updateUserInfo() {
    fullName.textContent = this.name;
    job.textContent = this.description;
  }

  setUserInfo(userInfo) {
    const { name, description } = userInfo;
    this.name = name;
    this.description = description;
  }
}
