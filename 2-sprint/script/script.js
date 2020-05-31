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
const cardList = new CardList(placeList, initialCards);
const formProfileObj = new FormProfile(
  formProfile,
  formValidatorProfile,
  popupProfileObj,
  userInfo,
  fullName,
  job
);
const formPlaceCardObj = new FormPlaceCard(
  formPlaceCard,
  formValidatorPlaceCard,
  popupPlaceCardObj,
  cardList
);

const createCard = (name, link) => {
  return new Card(name, link, handleOpenPopupImage);
};

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
  formPlaceCardObj.handleForm();
};

const handleOpenPopupProfile = () => {
  /**
   * Надо исправить:
   * Аналогично с Popup и FormValidator, не надо создавать каждый раз новый объект.
   * Достаточно создать их один раз в начале script.js
   *
   * То же самое касается и handleOpenPopupPlaceCard
   */

  /**
   * Надо исправить:
   * Дублирование кода.
   * Если полей станет 10, то здесь появится 10 одинаковых строк.
   * Необходимо перенеси это в FormValidator в метод, который будет сбрасывать состояние формы к исходному.
   * Чтобы сброс в форме редактирования профиля был корректный, необходимо обновлять поля с помощью установки
   * defaultValue: input.defaultValue = 'New Value'.
   * Тогда если вызвать form.reset(), то форма будет сбрасываться верно.
   * Сброс ошибок также необходимо делать массовый: используя querySelectorAll().
   * Внимание: сброс необходимо делать не всех форм, а только одной - с которой происходила работа.
   *
   * То же самое касается и handleOpenPopupPlaceCard
   */
  const { name, description } = { ...userInfo };
  formProfile.name.defaultValue = name;
  formProfile.description.defaultValue = description;
  formValidatorProfile.resetErrorMessage();

  /**
   * Надо исправить:
   * Данный код стоит перенести в отдельную функцию класса FormValidator
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
   */
  formProfileObj.handleForm();
};

openPopupPlaceCardButton.addEventListener("click", handleOpenPopupPlaceCard);
editProfileButton.addEventListener("click", handleOpenPopupProfile);

cardList.renderCards();

/**
 * Отлично, теперь код разбит на классы. Но все же есть места, которые надо доработать, чтобы код полностью
 * соответствовал ООП парадигме.
 *
 * Надо исправить:
 * 1. Не использовать глобальные переменные: один из принципов ООП - инкапсуляция. Использование document и
 *    переменных, объявленных в других файлах напрямую нарушает этот принцип. Вместо этого следует передавать
 *    нужные элементы и объекты в параметры конструктора.
 *    Не исправлено до конца:
 *    В конструкторе Card идет обращение к document, в Card.handleOpenPopupImage() также идет обращение к document.
 *    Необходимо избавиться от всех обращений к глобальным переменным.
 *    Использование document.createElement() является допустимым.
 * 2. Неверный механизм создания карточки.
 *    Сейчас используется глобальный объект card. Получается, что все карточки создаются с помощью одного объекта.
 *    Каждой карточке должен соответсвовать свой объект. Параметры name и link следует перенести в конструктор,
 *    а метод create должен формировать DOM-объект используя this.name и this.link. Чтобы создавать экземпляры
 *    класса Card внутри других классов следует создать функцию, которая будет создавать и возвращать экземпляр
 *    класса Card и передавать эту функцию в конструктор класса.
 *    Не исправлено до конца: вместо создания в классе объектов другого класса необходимо передать функцию, которая
 *    будет создавать этот объект.
 * 3. Создание в классе объектов других классов.
 *    В классе Popup создается объект FormValidator. Вместо этого необходимо использовать тот, что объявлен в script.js,
 *    передав его параметром в конструктор.
 * 4. Исправить дублирование кода, описанное выше
 * 5. Упростить работу с обработчиками - описано выше
 * 6. Создавать объекты классов Form и UserInfo при загрузке страницы.
 *
 * Внимание: работа принимается при исправлении всех замечаний с пометкой "Надо исправить".
 * Обращаю ваше внимание на то, что в данный момент требуются достаточно большие изменения в коде, поэтому
 * в следующих проверках не исключено появление новых замечаний, о которых не было указано ранее.
 */
