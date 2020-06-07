class UserInfo {
  constructor(fullName, job, api) {
    this.fullName = fullName;
    this.job = job;
    this.name = this.fullName.textContent;
    this.description = this.job.textContent;
  }

  updateUserInfo(userInfo) {
    const { name, about } = userInfo;
    this.name = name;
    this.description = about;
    this.fullName.textContent = this.name;
    this.job.textContent = this.description;
  }
}
