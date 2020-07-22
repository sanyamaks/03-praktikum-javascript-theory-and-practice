const openPopupPlaceCardButton = document.querySelector(
  ".button.user-info__button"
);
const openPopupProfileButton = document.querySelector(".user-info__edit");
const openPopupAvatarButton = document.querySelector(".user-info__photo");
const placeList = document.querySelector(".places-list");
const fullName = document.querySelector(".user-info__name");
const job = document.querySelector(".user-info__job");
const avatar = document.querySelector(".user-info__photo");
const popupProfile = document.querySelector(".popup_profile");
const popupPlaceCard = document.querySelector(".popup_place-card");
const popupImage = document.querySelector(".popup_image");
const popupAvatar = document.querySelector(".popup_avatar");
const formProfile = popupProfile.querySelector(".popup__form");
const formPlaceCard = popupPlaceCard.querySelector(".popup__form");
const formAvatar = popupAvatar.querySelector(".popup__form");
const popupProfileObj = new Popup(popupProfile);
popupProfileObj.setCloseButtonListeners();
const popupPlaceCardObj = new Popup(popupPlaceCard);
popupPlaceCardObj.setCloseButtonListeners();
const popupImageObj = new Popup(popupImage);
popupImageObj.setCloseButtonListeners();
const popupAvatarObj = new Popup(popupAvatar);
popupAvatarObj.setCloseButtonListeners();
const formValidatorProfile = new FormValidator(formProfile);
const formValidatorPlaceCard = new FormValidator(formPlaceCard);
const formValidatorAvatar = new FormValidator(formAvatar);
const userInfo = new UserInfo(fullName, job, avatar);

const createCard = card => {
  return new Card(card, handleOpenPopupImage);
};
const api = new Api({
  baseUrl: "https://praktikum.tk/cohort11",
  headers: {
    authorization: "4f5e3621-964f-4d58-88fd-12f1d002534a",
    "Content-Type": "application/json"
  }
});
const cardList = new CardList(placeList, createCard, api);

const formProfileObj = new FormProfile(
  formProfile,
  formValidatorProfile,
  popupProfileObj,
  api,
  userInfo
);
formProfileObj.setEventListeners();
const formPlaceCardObj = new FormPlaceCard(
  formPlaceCard,
  formValidatorPlaceCard,
  popupPlaceCardObj,
  api,
  cardList
);
formPlaceCardObj.setEventListeners();
const formAvatarObj = new FormAvatar(
  formAvatar,
  formValidatorAvatar,
  popupAvatarObj,
  api,
  userInfo
);
formAvatarObj.setEventListeners();

function handleOpenPopupImage(event) {
  if (event.target.classList.contains("place-card__image")) {
    const link = event.target.style.backgroundImage.slice(5, -2);
    const image = popupImage.querySelector(".popup__image");

    image.src = link;

    popupImageObj.open();
  }
}

const handleOpenPopupPlaceCard = () => {
  formValidatorPlaceCard.resetErrorMessage();
  popupPlaceCardObj.open();
  formPlaceCardObj.setFocusOnFirstInput();
};

const handleOpenPopupProfile = () => {
  const { name, description } = { ...userInfo };
  formProfile.name.defaultValue = name;
  formProfile.description.defaultValue = description;
  formValidatorProfile.resetErrorMessage();
  popupProfileObj.open();
  formProfileObj.setFocusOnFirstInput();
};

const handleOpenPopupAvatar = () => {
  formValidatorAvatar.resetErrorMessage();
  popupAvatarObj.open();
  formAvatarObj.setFocusOnFirstInput();
};

openPopupPlaceCardButton.addEventListener("click", handleOpenPopupPlaceCard);
openPopupProfileButton.addEventListener("click", handleOpenPopupProfile);
openPopupAvatarButton.addEventListener("click", handleOpenPopupAvatar);

api
  .getUserInfo()
  .then(info => {
    userInfo.updateUserInfo(info);
    userInfo.updateUserAvatar(info);
  })
  .catch(err => console.log(err));
api
  .getInitialCards()
  .then(cards => {

    /*REVIEW.'Можно ли так передавать ID?' Смотря какие цели Вы преследуете (я не совсем тщательно разбиралась в коде дополнительных заданий).
    При передаче как аргумента свойства класса UserInfo userInfo.userID (что технически можно, конечно, делать), Вы на каждом шаге рендера будете получать
    один и тот же свой id, который Вы получили при предыдущем запросе с помощью api.getUserInfo и, если именно это Вам нужно - можно. Но, при запросе
    api.getInitialCards Вы получаете массив cards, в котором есть id пользователя-собственника для каждой карточки, и его так же при рендере можно явно
    использовать, как cards.owner._id.  */

    cardList.renderCards(cards, userInfo.userID); //АМ: Можно ли так передавать ID? /
  })
  .catch(err => console.log(err));

/*REVIEW. Резюме.

Хорошая работа. Выполнены все дополнительные задания.
Учитывается асинхронность работы с сервером.

Но, необходимо преобразование структуры методов  класса Api.

Что нужно исправить.

1. Методы класса Api должны только возвращать ответ от сервера, обработку этого ответа они содержать не должны (так как это нарушает принцип ООП единственной
  ответственности метода и класса) (смотрите подробный комментарий в файле класса Api).


________________________________________________________________________________________________________________________________________________________
REVIEW2. Резюме2.

Проект хороший. Чувствуется интерес к делу.
Не очень поняла из Вашего вопроса в чём Вы испытываете затруднения, но, возможно, Вам будет интересно почитать про замыкания и лексическую область видимости
функции, которая упрощает передачу значений параметров и не только параметров в функции.
https://developer.mozilla.org/ru/docs/Web/JavaScript/Closures.


Работа принимается.

Желаю дальнейших успехов в обучении!

*/
