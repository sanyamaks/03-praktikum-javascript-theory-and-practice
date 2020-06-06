class Api {
  constructor(options) {
    this.options = options;
  }

  getInitialCards() {
    fetch(this.options.baseUrl + "/cards", { headers: this.options.headers })
      .then((res) => {
        return this.isResolve(res);
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  getInfoUser() {
    fetch(this.options.baseUrl + "/users/me", { headers: this.options.headers })
      .then((res) => {
        return this.isResolve(res);
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  updateUserInfo() {
    fetch(this.options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        name: "TestName",
        about: "Physicist and Chemist",
      }),
    })
      .then((res) => {
        return this.isResolve(res);
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  addCard() {
    fetch(this.options.baseUrl + "/cards", {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        name: "TestCard",
        link:
          "https://bipbap.ru/wp-content/uploads/2017/10/0_8eb56_842bba74_XL-640x400.jpg",
      }),
    })
      .then((res) => {
        return this.isResolve(res);
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  removeCard(cardId) {
    fetch(this.options.baseUrl + "/cards/" + cardId, {
      method: "DELETE",
      headers: this.options.headers,
    })
      .then((res) => {
        return this.isResolve(res);
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  putLike(cardId) {
    fetch(this.options.baseUrl + "/cards/like/" + cardId, {
      method: "PUT",
      headers: this.options.headers,
    })
      .then((res) => {
        return this.isResolve(res);
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  removeLike(cardId) {
    fetch(this.options.baseUrl + "/cards/like/" + cardId, {
      method: "DELETE",
      headers: this.options.headers,
    })
      .then((res) => {
        return this.isResolve(res);
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  updateUserAvatar(linkAvatar) {
    fetch(this.options.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({ avatar: linkAvatar }),
    })
      .then((res) => {
        return this.isResolve(res);
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  isResolve(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}
