class UserInfo {
  constructor(fullName, job) {
    this.fullName = fullName;
    this.job = job;
    this.name = this.fullName.textContent;
    this.description = this.job.textContent;
  }

  updateUserInfo(userInfo) {
    const { name, description } = userInfo;
    this.name = name;
    this.description = description;
    this.fullName.textContent = this.name;
    this.job.textContent = this.description;
  }
}
