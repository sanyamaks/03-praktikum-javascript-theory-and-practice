const openPopupPlaceCardButton = document.querySelector(
  ".button.user-info__button"
);
const editProfileButton = document.querySelector(".user-info__edit");
const popupProfile = document.querySelector(".popup_profile");
const popupPlaceCard = document.querySelector(".popup_place-card");
const formProfile = popupProfile.querySelector(".popup__form");
const formPlaceCard = popupPlaceCard.querySelector(".popup__form");
const popupProfileObj = new Popup(popupProfile);
const popupPlaceCardObj = new Popup(popupPlaceCard);
const formValidatorProfile = new FormValidator(formProfile);
const formValidatorPlaceCard = new FormValidator(formPlaceCard);

const cardList = new CardList();

const handleOpenPopupPlaceCard = () => {
  const form = new FormPlaceCard(
    formPlaceCard,
    formValidatorPlaceCard,
    popupPlaceCardObj
  );

  formValidatorPlaceCard.resetErrorMessage(formPlaceCard.name, "", true);
  formValidatorPlaceCard.resetErrorMessage(formPlaceCard.link, "", true);

  popupPlaceCardObj.open();
  popupPlaceCardObj.setListenersAfterOpenPopup();
  form.handleForm();
};

const handleOpenPopupProfile = () => {
  const userInfo = new UserInfo();
  const form = new FormProfile(
    formProfile,
    formValidatorProfile,
    popupProfileObj,
    userInfo
  );

  formProfile.name.value = userInfo.name;
  formProfile.description.value = userInfo.description;
  formValidatorProfile.resetErrorMessage(formProfile.name, "", true); //Отдельная очистка ошибок здесь для того, если форма закроется по кнопке "Закрыть"
  formValidatorProfile.resetErrorMessage(formProfile.description, "", true);

  const isValidForm = formValidatorProfile
    .checkFormValidity()
    .every(item => item.valid);
  formValidatorProfile.setSubmitButtonState(isValidForm);

  popupProfileObj.open();
  popupProfileObj.setListenersAfterOpenPopup();
  form.handleForm();
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
