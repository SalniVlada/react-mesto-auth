import React from 'react';
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'; 

function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  };

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  };

  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateUser({
      name: name,
      about: description,
    });

    onClose();
  }

  return(
    <PopupWithForm name='person' title='Редактировать профиль' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} caption='Сохранить'>
      <label className="popup__input-area">
        <input type="text" value={name || ""} onChange={handleChangeName} name="personName" className="popup__input popup__input_add_name" placeholder="Имя" required minLength={2} maxLength={40}/>
        <span className="error-text" id="personNameError"></span>
      </label>
      <label className="popup__input-area">
        <input type="text" value={description || ""} onChange={handleChangeDescription} name="personAbout" className="popup__input popup__input_add_about" placeholder="О себе" required minLength={2} maxLength={200}/>
        <span className="error-text" id="personAboutError"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;

