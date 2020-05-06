// Можно лучше (минута делов):   перенесите  в отдельный файл, меньше строк, больше понимание, 
// Правильная организация кода, это важная часть разработки. Ведь код надо постоянно поддерживать
// подключить его можно через  <script src="js/initialCards.js"></script> 
// Плюс мы выносим данные отдельно, а логика останется в этом файле 
let initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"
  },
  {
    name: "Нургуш",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg"
  },
  {
    name: "Тулиновка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg"
  },
  {
    name: "Остров Желтухина",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg"
  },
  {
    name: "Владивосток",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg"
  }
];
const placesList = document.querySelector(".places-list");
const openPopupButton = document.querySelector(".button.user-info__button");
const popup = document.querySelector(".popup");
const closePopupButton = document.querySelector(".popup__close");

const renderCards = () => {
  placesList.innerHTML = "";
  initialCards.map((card, id) => {
    const placeCard = createCard(card.name, card.link, id);
    placesList.appendChild(placeCard);
  });
};
/*  Можно лучше: В качестве параметров передавайте не переменные, а объект
*  если в ходе развития проекта, добавятся переменные, то вам придётся менять код во многих местах
*  https: //refactoring.guru/ru/smells/long-parameter-list
* Как пример:
 const myObject = {name:"test", url : "http//:ya.ru"}
 function myFunction(param)
 {
   param.name;
   param.url;
 }
 myFunction(myObject)
*/
const createCard = (cardName, urlImage, idCard) => {
  /*  Можно лучше:
  *  Альтернативный способ создания карточки. При нем не требуется создавать вручную все
  * Вы можете реализовать функцию, которая сразу же возвращает “кусок” разметки. Это решает проблему постоянного createElement DOM-элементов.
   function getTemplate(data){
     const template = `<div class="place-card">
                 <div class="place-card__image" style="background: url(${data.link})">
                   <button class="place-card__delete-icon"></button>
                 </div>
                 <div class="place-card__description">
                   <h3 class="place-card__name">${data.name}</h3>
                   <button class="place-card__like-icon"></button>
                 </div>
               </div>`
   return template;
   }
  *  Этот кусок разметки в дальнейшем можно вставить в DOM, воспользовавшись методом insertAdjacentHTML().
  *  https: //developer.mozilla.org/ru/docs/Web/API/Element/insertAdjacentHTML
  *    pointElement.insertAdjacentHTML('afterend', getTemplate(data));
  */
  const placeCard = document.createElement("div");
  const placeCardImage = document.createElement("div");
  const placeCardDeleteIcon = document.createElement("button");
  const placeCardDescription = document.createElement("div");
  const placeCardName = document.createElement("h3");
  const placeCardLikeIcon = document.createElement("button");

  placeCard.classList.add("place-card");
  placeCard.classList.add("places-list__place-card");
  placeCardImage.classList.add("place-card__image");
  placeCardDeleteIcon.classList.add("place-card__delete-icon");
  placeCardDescription.classList.add("place-card__description");
  placeCardName.classList.add("place-card__name");
  placeCardLikeIcon.classList.add("place-card__like-icon");

  placeCard.id = idCard;
  placeCardImage.style.backgroundImage = `url(${urlImage})`;
  placeCardName.textContent = `${cardName}`;

  placeCard.appendChild(placeCardImage);
  placeCard.appendChild(placeCardDescription);
  placeCardImage.appendChild(placeCardDeleteIcon);
  placeCardDescription.appendChild(placeCardName);
  placeCardDescription.appendChild(placeCardLikeIcon);

  return placeCard;
};

const openPopup = () => {
  const form = document.forms.new;
  popup.classList.add("popup_is-opened");
  openPopupButton.removeEventListener("click", openPopup);
  closePopupButton.addEventListener("click", closePopup);
  form.addEventListener("submit", addChild);
  form.name.focus();
};

const closePopup = () => {
  popup.classList.remove("popup_is-opened");
  openPopupButton.addEventListener("click", openPopup);
  closePopupButton.removeEventListener("click", closePopup);
};

const clickLike = event => {
  if (event.target.classList.contains("place-card__like-icon")) {
    event.target.classList.toggle("place-card__like-icon_liked");
  }
};

const addChild = function(event) {
  const name = this.elements.name;
  const link = this.elements.link;
  // можно лучше: Для валидации используйте кастомный метод validation
  // https: //developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5/Constraint_validation#Constraint_API%27s_element.setCustomValidity() 
  // на русском https: //msiter.ru/tutorials/javascript/js_validation 
  // на русском https://htmlacademy.ru/blog/useful/html/form-validation-techniques 
  // на английском очень хорошая статья с примерами https://css-tricks.com/form-validation-part-2-constraint-validation-api-javascript/ 
  // 
  // как пример, если вы установите  <input type="text" min="10" max="100" >
  // то сразу сможете определить что текст слишком короткий, например так: 
  //  
  // if (validity.tooShort) { 
  // // Значение слишком короткое 
  // }
  // if (validity.tooLong) { 
  // // Значение слишком длинное 
  // }
  if (name.value !== "" && link.value !== "") {
    event.preventDefault();
    initialCards.push({ name: name.value, link: link.value });
    this.reset();
    closePopup();
    renderCards();
    this.removeEventListener("submit", addChild);
  } else {
    event.preventDefault();
  }
};

const removeChild = event => {
  if (event.target.classList.contains("place-card__delete-icon")) {
    const id = event.target.parentElement.parentElement.id;
    initialCards.splice(id, 1);
    renderCards();
  }
};

const handleClickPlaceList = event => {
  clickLike(event);
  removeChild(event);
};

openPopupButton.addEventListener("click", openPopup);
placesList.addEventListener("click", handleClickPlaceList);

renderCards();


/**
 * Здравствуйте.
 * --------------------------------------------------------------------
 * Весь функционал работает корректно
 * Код чистый и хорошо читается
 * Вы используете логические группировки операций
 * У вас нет дублирование кода
 *  Вы не используете небезопасный innerHtml
 *  Вы используете делегирование

 * можно лучше: избегайте сложных условий и большой вложенности в условии. Чем сложнее условие, чем больше
 * вложенности в условии, тем сложнее анализировать код, сложнее искать ошибки и поддерживать такой код
 * самый простой вариант это убирать условия или блок в условии в отдельную функцию
 *
 * можно лучше: Старайтесь не объявлять большое количество переменных. Чем больше переменных, тем сложнее понимать за что они
 * отвечают и какую полезную нагрузку несут в коде. Лучше инкапсулировать(прятать) переменные в функциях.
 * В будущем вам проще будет искать ошибки и разбираться в сложных взаимосвязях
 *
 */
