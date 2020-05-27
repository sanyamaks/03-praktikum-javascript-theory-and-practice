const placesList = document.querySelector(".places-list");
const openPopupPlaceCardButton = document.querySelector(
  ".button.user-info__button"
);
const editProfileButton = document.querySelector(".user-info__edit");
const fullName = document.querySelector(".user-info__name");
const job = document.querySelector(".user-info__job");

const card = new Card();
const cardList = new CardList(placesList, initialCards);
const userInfo = new UserInfo(fullName, job);

const handleOpenPopupPlaceCard = () => {
  const popupPlaceCard = document.querySelector(".popup_place-card");
  const formPlaceCard = popupPlaceCard.querySelector(".popup__form");
  const formValidator = new FormValidator(formPlaceCard);
  const popup = new Popup(popupPlaceCard);
  const form = new FormPlaceCard(formPlaceCard, formValidator, popup);

  formValidator.setErrorMessageState(formPlaceCard.name, "", true);
  formValidator.setErrorMessageState(formPlaceCard.link, "", true);

  popup.open(popupPlaceCard);
  popup.setListenersAfterOpenPopup();
  form.handleFormPlaceCard();
};

const handleOpenPopupProfile = () => {
  const popupProfile = document.querySelector(".popup_profile");
  const formProfile = popupProfile.querySelector(".popup__form");
  const formValidator = new FormValidator(formProfile);
  const popup = new Popup(popupProfile);
  const form = new FormProfile(formProfile, formValidator, popup);

  formProfile.name.value = userInfo.name;
  formProfile.description.value = userInfo.description;
  formValidator.setErrorMessageState(formProfile.name, "", true);
  formValidator.setErrorMessageState(formProfile.description, "", true);

  const isValidForm = formValidator
    .checkFormValidity()
    .every(item => item.valid);
  formValidator.setSubmitButtonState(isValidForm);

  popup.open(popupProfile);
  popup.setListenersAfterOpenPopup();
  form.handleFormProfile();
};

openPopupPlaceCardButton.addEventListener("click", handleOpenPopupPlaceCard);
editProfileButton.addEventListener("click", handleOpenPopupProfile);

cardList.renderCards();

/**
 * Отлично, теперь код разбит на классы. Но все же есть места, которые надо доработать, чтобы код полностью
 * соответствовал ООП парадигме.
 *
 * Надо исправить:
 * 1. Следует вынести все .js файлы в отдельную папку.
 * 2. Баг: при удалении карточки снимаются лайки с других карточек. Вместо перерисовки следует удалять единственный
 *    элемент с помощью element.remove(). В текущей реализации, если карточек станет много, постоянная перерисовка
 *    карточек может сильно ударить по производительности. Также я обратил внимание, что при добавлении новой
 *    карточки также идет перерисовка заново - это не правильно и так же сильно уменьшает производительность.
 *    Вместо манипулирования id, лучше хранить в экземлпяре класса Card ссылку на элемент, содержащий эту карточку.
 * 3. Не использовать глобальные переменные: один из принципов ООП - инкапсуляция. Использование document и
 *    переменных, объявленных в других файлах напрямую нарушает этот принцип. Вместо этого следует передавать
 *    нужные элементы и объекты в параметры конструктора.
 *    Примеры:
 *    - В классе Card в методе remove() идет обращение к initialCards и cardList напрямую
 *    - В классе CardList в методе renderCards() идет обращение к cards и placesList напрямую
 *    - В классе UserInfo в методе updateUserInfo() идет обращение к fullName и job напрямую
 * 4. Неверный механизм создания карточки.
 *    Сейчас используется глобальный объект card. Получается, что все карточки создаются с помощью одного объекта.
 *    Каждой карточке должен соответсвовать свой объект. Параметры name и link следует перенести в конструктор,
 *    а метод create должен формировать DOM-объект используя this.name и this.link. Чтобы создавать экземпляры
 *    класса Card внутри других классов следует создать функцию, которая будет создавать и возвращать экземпляр
 *    класса Card и передавать эту функцию в конструктор класса.
 * 5. Объекты класса Popup должны создаваться (!) один раз каждый и передаваться в другие методы/конструкторы с
 *    помощью параметра. Лучше всего создать их в script.js.
 *    Сейчас получается, что попапы создаются каждый раз заново, когда происходит клик по картинке или кнопке,
 *    вызывающей попап.
 * 6. Аналогичное требование к FormValidator
 * 7. Дублирование кода.
 *    Классы FormPlaceCard и FormProfile имеют одинаковые участки кода.
 *    Следует создать класс Form, поместить туда общие части кода и наследоваться от этого класса.
 *    В handleSubmit может понадобится super() (http://jsraccoon.ru/es6-classes#super)
 *    Также можно сделать класс мастшабируемым, реализовав в setEventListeners проход по всем .popup__input
 *
 * Внимание: работа принимается при исправлении всех замечаний с пометкой "Надо исправить".
 * Обращаю ваше внимание на то, что в данный момент требуются достаточно большие изменения в коде, поэтому
 * в следующих проверках не исключено появление новых замечаний, о которых не было указано ранее.
 */
