class UserInfo {
  constructor() {
    this.name = document.querySelector(".user-info__name").textContent;
    this.description = document.querySelector(".user-info__job").textContent;
  }

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
