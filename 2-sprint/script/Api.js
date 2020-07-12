class Api {
  constructor(options) {
    this.options = options;
  }


  getInitialCards() {
    return fetch(this.options.baseUrl + "/cards", {
      headers: this.options.headers
    }).then(res => {
      return this.isResolve(res);
    });
  }

  getUserInfo() {
    return fetch(this.options.baseUrl + "/users/me", {
      headers: this.options.headers
    }).then(res => {
      return this.isResolve(res);
    });
  }

  updateUserInfo(userInfo) {
    return fetch(this.options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify(userInfo)
    }).then(res => {
      return this.isResolve(res);
    });
  }

  addCard(card) {
    return fetch(this.options.baseUrl + "/cards", {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify(card)
    }).then(res => {
      return this.isResolve(res);
    });
  }

  removeCard(cardID) {
    return fetch(this.options.baseUrl + "/cards/" + cardID, {
      method: "DELETE",
      headers: this.options.headers
    }).then(res => {
      return this.isResolve(res);
    });
  }

  putLike(cardID) {
    return fetch(this.options.baseUrl + "/cards/like/" + cardID, {
      method: "PUT",
      headers: this.options.headers
    }).then(res => {
      return this.isResolve(res);
    });
  }

  removeLike(cardID) {
    return fetch(this.options.baseUrl + "/cards/like/" + cardID, {
      method: "DELETE",
      headers: this.options.headers
    }).then(res => {
      return this.isResolve(res);
    });
  }

  updateUserAvatar(linkAvatar) {
    return fetch(this.options.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify(linkAvatar)
    }).then(res => {
      return this.isResolve(res);
    });
  }

  isResolve(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}
