import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'; 

function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `element__delete ${isOwn ? '' : 'element__delete_hidden'}`;

  const isLiked = card.likes.some(i => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__button ${isLiked ? 'element_active' : ''}`; 
  

  const handleCardClick = () => {
    onCardClick(card);
  };

  const handleCardLike =() => {
    onCardLike(card);
  }

  const handleDeleteClick =() => {
    onCardDelete(card);
  }

  return(
    <li className="element">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="Удалить"></button>
      <img src={card.link} alt={card.name} className="element__photo" onClick={handleCardClick}/>
        <div className="element__group">
          <h3 className="element__title">{card.name}</h3>
          <div className="element__likes">
            <button type="button" className={cardLikeButtonClassName} onClick={handleCardLike} aria-label="Нравится"></button>
            <p className="element__counter">{card.likes.length}</p>
          </div>
        </div>
    </li>
  )
}

export default Card;