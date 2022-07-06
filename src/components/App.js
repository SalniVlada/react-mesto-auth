import React from 'react';
import { Routes, Route } from "react-router-dom";

import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import api from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'; 
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Register from './Register';

function App() {

  const [isPopupEditAvatar, setPopupEditAvatar] = React.useState(false);
  const [isPopupEditProfile, setPopupEditProfile] = React.useState(false);
  const [isPopupAddPlace, setPopupAddPlace] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState([]);
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);

  React.useEffect(() => {
    api.getUserInfo().then((data) => {
      setCurrentUser(data)
    })
    .catch((err) => 
      console.error(err));
  }, []);

  function handleEditAvatarClick() {
    setPopupEditAvatar(true);
  }

  function handleEditProfileClick() {
    setPopupEditProfile(true);
  }

  function handleAddPlaceClick() {
    setPopupAddPlace(true);
  }

  function closeAllPopups() {
    setPopupEditAvatar(false);
    setPopupEditProfile(false);
    setPopupAddPlace(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser({name, about}) {
    api.patchUserInfo({"name": name, "about": about})
    .then((userData)=>{
      setCurrentUser(userData);
    })
    .catch((err) => console.error(err));
  }

  function handleUpdateAvatar({avatar}) {
    api.patchUserAvatar({"avatar": avatar})
    .then((userData)=>{
      setCurrentUser(userData);
    })
    .catch((err) => console.error(err));
  }

  function handleUpdateCard({name, link}) {
    api.postCard({"name": name, "link": link})
    .then((newCard)=>{
      setCards([newCard, ...cards]);
    })
    .catch((err) => console.error(err));
  }

  React.useEffect(() => {
    api.getInitialCards().then((data) => {
      setCards(data)
    })
    .catch((err) => 
      console.error(err));
  }, []);

  const setNewCards = (id, newCard) => {
    setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    if (isLiked) {
      api.deleteLikes(card._id, !isLiked).then((newCard) => {
        setNewCards(card._id, newCard);
      })
        .catch((err) => 
          console.error(err));
    } else {
      api.putLikes(card._id, isLiked).then((newCard) => {
          setNewCards(card._id, newCard);
        })
        .catch((err) => 
          console.error(err));
      }
  }

  const handleCardDelete = (card) => {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter((c) => (c._id !== card._id)));
    })
    .catch((err) =>
      console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>

        <Routes>
          <Route path="/sign-up" element={<Register/>} />
          <Route path="/sign-in" element={<Login/>} />
          <Route path="/" element={}/>
        </Routes>

          <Header/>

          <Main onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} 
          isEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>

          <Footer/>

          <EditProfilePopup isOpen={isPopupEditProfile} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

          <AddPlacePopup isOpen={isPopupAddPlace} onClose={closeAllPopups} onUpdateCard={handleUpdateCard}/>

          <EditAvatarPopup isOpen={isPopupEditAvatar} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

          <PopupWithForm name='delete' title='Вы уверены?'/>

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        </div>
    </CurrentUserContext.Provider>
  );
}


export default App;
