import {useContext} from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'; 


function Main({onCardClick, onCardLike, onCardDelete, isEditAvatar, onEditProfile, isAddPlacePopupOpen, cards}) {

  const currentUser = useContext(CurrentUserContext);

  const renderCard = (card) => {
    return <Card card={card} key={card._id} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} />
  }

  return(
    <main className="content">
      <section className="profile">
        <img src={currentUser.avatar} alt="Фотография Жак-Ив Кусто" className="profile__avatar" />
        <div className="profile__edit-avatar" onClick={isEditAvatar}></div>
        <div className="profile__info">
          <div className="profile__name-panel">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button type="button" className="profile__button" aria-label="Редактировать" onClick={onEditProfile}></button>
          </div>
        <p className="profile__about">{currentUser.about}</p>
        </div>
        <button type="button" className="profile__add-button" aria-label="Добавить" onClick={isAddPlacePopupOpen}></button>
      </section>

      <section className="cards">
          <ul className="elements">
            {cards.map(renderCard)}
          </ul>
      </section>
    </main>
  );
}

export default Main;