const getTemplateCard = ({name, link}) => {
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

  placeCardImage.style.backgroundImage = `url(${link})`;
  placeCardName.textContent = `${name}`;

  placeCard.appendChild(placeCardImage);
  placeCard.appendChild(placeCardDescription);
  placeCardImage.appendChild(placeCardDeleteIcon);
  placeCardDescription.appendChild(placeCardName);
  placeCardDescription.appendChild(placeCardLikeIcon);

  return placeCard;
};
