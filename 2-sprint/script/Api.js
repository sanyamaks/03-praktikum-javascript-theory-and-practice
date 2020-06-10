class Api {
  constructor(options) {
    this.options = options;
  }

  /*REVIEW.Нужно исправить. Структура методов класса Api должна быть следующей:

    methodApi = (...) => {
      return fetch(`...`, {
         ...
        })
        .then(res => {
          if (!res.ok) {
            return Promise.reject(res.status);
          } else {
            return res.json();
          }
        })
    }
    То есть,
    как Вы видете из приведённой структуры методов, они только возвращают ответ от сервера в виде объекта-промиса - успешного ответа, или объекта ошибки
    (обратите внимание, что нужна инструкция return перед fetch), обработку этого ответа они содержать не должны (так как это нарушает принцип ООП единственной
    ответственности метода и класса).
    Методы Api должны вызываться в других файлах Вашего проекта, и возвращаемый ими объект должен обрабатываться в методе .then, прикреплённом
    к методу Api, силами методов других классов. Блок .catch должен быть последним в цепочке (после метода .then, в котором обрабатывается ответ).

    То есть структура вызова преобразованного метода api и обработки результата ответа должна быть такой:

    api.methodApi(параметры).then(обработка ответа силами методов других классов).catch(...);

    */
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
