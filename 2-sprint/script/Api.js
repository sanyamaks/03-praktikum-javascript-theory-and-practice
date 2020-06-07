class Api {
  constructor(options, userInfo, cardList) {
    this.options = options;
    this.userInfo = userInfo;
    this.cardList = cardList;
  }

  getInitialCards() {
    fetch(this.options.baseUrl + "/cards", { headers: this.options.headers })
      .then(res => {
        return this.isResolve(res);
      })
      .then(cards => {
        this.cardList.renderCards(cards, this.userID, this);
      })
      .catch(err => console.log(err));
  }

  getUserInfo() {
    fetch(this.options.baseUrl + "/users/me", {
      headers: this.options.headers
    })
      .then(res => {
        return this.isResolve(res);
      })
      .then(userInfo => {
        this.userID = userInfo._id;
        this.userInfo.updateUserInfo(userInfo);
        this.userInfo.updateUserAvatar(userInfo);
      })
      .catch(err => console.log(err));
  }

  updateUserInfo(userInfo, form) {
    this.form = form;
    this.form.renderLoading(true);
    fetch(this.options.baseUrl + "/users/me", {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify(userInfo)
    })
      .then(res => {
        return this.isResolve(res);
      })
      .then(userInfo => {
        this.userInfo.updateUserInfo(userInfo);

        this.form.closePopup();
      })
      .catch(err => console.log(err))
      .finally(() => this.form.renderLoading(false));
  }

  addCard(card, form) {
    this.form = form;
    this.form.renderLoading(true);
    fetch(this.options.baseUrl + "/cards", {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify(card)
    })
      .then(res => {
        return this.isResolve(res);
      })
      .then(card => {
        this.cardList.addCard(card);
        this.form.closePopup();
      })
      .catch(err => console.log(err))
      .finally(() => this.form.renderLoading(false));
  }

  removeCard(card) {
    this.card = card;
    fetch(this.options.baseUrl + "/cards/" + this.card.cardInfo._id, {
      method: "DELETE",
      headers: this.options.headers
    })
      .then(res => {
        return this.isResolve(res);
      })
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  putLike(card) {
    this.card = card;
    fetch(this.options.baseUrl + "/cards/like/" + this.card.cardInfo._id, {
      method: "PUT",
      headers: this.options.headers
    })
      .then(res => {
        return this.isResolve(res);
      })
      .then(card => this.card.changeNumberLikes(card))
      .catch(err => console.log(err));
  }

  removeLike(card) {
    this.card = card;
    fetch(this.options.baseUrl + "/cards/like/" + this.card.cardInfo._id, {
      method: "DELETE",
      headers: this.options.headers
    })
      .then(res => {
        return this.isResolve(res);
      })
      .then(card => this.card.changeNumberLikes(card))
      .catch(err => console.log(err));
  }

  updateUserAvatar(linkAvatar, form, popup) {
    this.form = form;
    this.popup = popup;
    this.form.renderLoading(true);
    fetch(this.options.baseUrl + "/users/me/avatar", {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify(linkAvatar)
    })
      .then(res => {
        return this.isResolve(res);
      })
      .then(avatar => {
        this.userInfo.updateUserAvatar(avatar);
        this.form.closePopup();
        console.log(1);
      })
      .catch(err => console.log(err))
      .finally(() => this.form.renderLoading(false));
  }

  isResolve(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }
}
