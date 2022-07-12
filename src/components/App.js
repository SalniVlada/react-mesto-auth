import {useEffect, useState} from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";

import '../index.css';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';

import { api, auth } from '../utils/Api.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'; 

import Login from './Login';
import Register from './Register';
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const navigate = useNavigate();
  const [isPopupEditAvatar, setPopupEditAvatar] = useState(false);
  const [isPopupEditProfile, setPopupEditProfile] = useState(false);
  const [isPopupAddPlace, setPopupAddPlace] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [isToolTipVisible, setToolTipVisible] = useState(false);
  const [isToolTipSuccess, setToolTipSuccess] = useState(false);
  const [toolTipText, setToolTipText] = useState('');

  useEffect(() => {
    tokenCheck();
    if (loggedIn) {
      api.getUserInfo().then((data) => {
        setCurrentUser(data)
      })
      .catch((err) => console.error(err));
    }
  }, [loggedIn]);

  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getUserAuth(jwt)
        .then((data) => {
          setEmail(data.data.email);
          setLoggedIn(true);
        })
        .then(() => navigate('/'))
        .catch((err) => {
          console.log(err);
        });
    }
  }

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

  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards().then((data) => {
        setCards(data)
      })
    .catch((err) => console.error(err));
    }
  }, [loggedIn]);

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

  function onRegister(password, email) {
    auth.signUp({password: password, email: email})
      .then((data) => {
        setToolTipSuccess(true);
        setToolTipVisible(true);
        setToolTipText("Вы успешно зарегистрировались!");
        navigate('/sign-in');
      })
      .catch((err) => {
        setToolTipSuccess(false);
        setToolTipVisible(true);
        setToolTipText("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err)
      });
  }

  function onLogin(password, email) {
    auth.signIn({password: password, email: email})
      .then((data) => {
        localStorage.setItem('jwt', data.token);
        setEmail(email);
        setLoggedIn(true);
        navigate('/');
      })
      .catch((err) => {
        setToolTipVisible(true);
        setToolTipText("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err)
      });
  }

  function closeToolTip() {
    setToolTipVisible(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <Header email={email}/>

        <Routes>
          <Route path="/sign-up" element={<Register onRegister={onRegister}/>} />

          <Route path="/sign-in" element={<Login onLogin={onLogin}/>} />

          <Route path="/" element={<ProtectedRoute loggedIn={loggedIn} />}>
            <Route path="/" element={<Main onEditProfile={handleEditProfileClick} isAddPlacePopupOpen={handleAddPlaceClick} 
                isEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}/>}
            />
          </Route>
        </Routes>

        <Footer/>

        <EditProfilePopup isOpen={isPopupEditProfile} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>

        <AddPlacePopup isOpen={isPopupAddPlace} onClose={closeAllPopups} onUpdateCard={handleUpdateCard}/>

        <EditAvatarPopup isOpen={isPopupEditAvatar} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>

        <PopupWithForm name='delete' title='Вы уверены?'/>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <InfoTooltip isVisible={isToolTipVisible} isSuccess={isToolTipSuccess} onClose={closeToolTip} text={toolTipText} />

      </div>
    </CurrentUserContext.Provider>
  );
}


export default App;
