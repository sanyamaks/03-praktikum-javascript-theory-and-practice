const openPopupPlaceCardButton = document.querySelector(
  ".button.user-info__button"
);
const editProfileButton = document.querySelector(".user-info__edit");
const placeList = document.querySelector(".places-list");
const fullName = document.querySelector(".user-info__name");
const job = document.querySelector(".user-info__job");
const popupProfile = document.querySelector(".popup_profile");
const popupPlaceCard = document.querySelector(".popup_place-card");
const popupImage = document.querySelector(".popup_image");
const formProfile = popupProfile.querySelector(".popup__form");
const formPlaceCard = popupPlaceCard.querySelector(".popup__form");
const popupProfileObj = new Popup(popupProfile);
popupProfileObj.setCloseButtonListeners();
const popupPlaceCardObj = new Popup(popupPlaceCard);
popupPlaceCardObj.setCloseButtonListeners();
const popupImageObj = new Popup(popupImage);
popupImageObj.setCloseButtonListeners();
const formValidatorProfile = new FormValidator(formProfile);
const formValidatorPlaceCard = new FormValidator(formPlaceCard);
const userInfo = new UserInfo(fullName, job);
const cardList = new CardList(placeList, initialCards, createCard);
const formProfileObj = new FormProfile(
  formProfile,
  formValidatorProfile,
  popupProfileObj,
  userInfo
);
formProfileObj.setEventListeners();
const formPlaceCardObj = new FormPlaceCard(
  formPlaceCard,
  formValidatorPlaceCard,
  popupPlaceCardObj,
  cardList
);
formPlaceCardObj.setEventListeners();

function createCard(name, link) {
  return new Card(name, link, handleOpenPopupImage);
}

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
  formValidatorPlaceCard.setSubmitButtonState(false);
  popupPlaceCardObj.open();
  formPlaceCardObj.setFocusOnFirstInput();
};

const handleOpenPopupProfile = () => {
  /**
   * Можно лучше:
   * Не обращаться к полям напрямую, а реализовать метод который вернет объект с информацией.
   * В терминологии ООП это называется геттер
   * Подробнее: https://learn.javascript.ru/private-protected-properties-methods
   *
   * Можно лучше:
   * defaultValue нужно изменять только при сохранении формы
   * (в handleSubmitForm класса FormProfile перед обновлением userInfo)
   */
  const { name, description } = { ...userInfo };
  formProfile.name.defaultValue = name;
  formProfile.description.defaultValue = description;
  formValidatorProfile.resetErrorMessage();

  /**
   * Можно лучше:
   * Перенести в resetErrorMessage()
   */
  formValidatorProfile.setSubmitButtonState(formValidatorProfile.isValidForm);
  popupProfileObj.open();
  /**
   * Надо исправить:
   * Нет необходимости снимать/назначать обработчики.
   * Достаточно установить их про создании объекта.
   * Например: клик по кнопке, открывающей попап, невозможен при открытом попапе, т.к. слой попапа находится над
   * слоем с кнопкой.
   *
   * То же самое касается и handleOpenPopupPlaceCard
   *
   * Не исправлено: обработчики устанавливаются при каждом открытии попапа
   * Следует вызывать setEventListenersFormProfile сразу после создания обхекта formProfileObj
   */
  formProfileObj.setFocusOnFirstInput();
};

openPopupPlaceCardButton.addEventListener("click", handleOpenPopupPlaceCard);
editProfileButton.addEventListener("click", handleOpenPopupProfile);

cardList.renderCards();

/**
 * Удалил исправленные замечания.
 *
 * Надо исправить:
 * 1. Исправить дублирование кода в дочерних классах класса Form.
 * 2. Исправить Использование глобальной функции createCard
 * 3. Исправить установку обработчиков - комментарий выше
 *
 * Внимание: работа принимается при исправлении всех замечаний с пометкой "Надо исправить".
 */
