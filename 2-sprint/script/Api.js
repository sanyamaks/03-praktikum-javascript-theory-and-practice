class Api {
  constructor(options, userInfo, cardList) {
    this.options = options;
    this.userInfo = userInfo;
    this.cardList = cardList;
  }

  getInitialCards() {
    fetch(this.options.baseUrl + "/cards", { headers: this.options.headers })
      .then((res) => {
        return this.isResolve(res);
      })
      .then((cards) => {console.log(cards); this.cardList.renderCards(cards, this.userID, this)})
      .catch((err) => console.log(err));
  }

  getUserInfo() {
    fetch(this.options.baseUrl + "/users/me", {
      headers: this.options.headers,
    })
      .then((res) => {
        return this.isResolve(res);
      })
      .then((userInfo) => {
        console.log(userInfo);
        this.userID = userInfo._id;
        this.userInfo.updateUserInfo(userInfo);
      })
      .catch((err) => console.log(err));
  }

  updateUserInfo(userInfo) {
    fetch(this.options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify(userInfo),
    })
      .then((res) => {
        return this.isResolve(res);
      })
      .then((userInfo) => this.userInfo.updateUserInfo(userInfo))
      .catch((err) => console.log(err));
  }

  addCard(card) {
    fetch(this.options.baseUrl + "/cards", {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify(card),
    })
      .then((res) => {
        return this.isResolve(res);
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  removeCard(card) {
    this.card = card;
    fetch(this.options.baseUrl + "/cards/" + this.card.cardInfo._id, {
      method: "DELETE",
      headers: this.options.headers,
    })
      .then((res) => {
        return this.isResolve(res);
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  putLike(card) {
    this.card = card;
    fetch(this.options.baseUrl + "/cards/like/" + this.card.cardInfo._id, {
      method: "PUT",
      headers: this.options.headers,
    })
      .then((res) => {
        return this.isResolve(res);
      })
      .then((card) => this.card.changeNumberLikes(card))
      .catch((err) => console.log(err));
  }

  removeLike(card) {
    this.card = card;
    fetch(this.options.baseUrl + "/cards/like/" + this.card.cardInfo._id, {
      method: "DELETE",
      headers: this.options.headers,
    })
      .then((res) => {
        return this.isResolve(res);
      })
      .then((card) => this.card.changeNumberLikes(card))
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
