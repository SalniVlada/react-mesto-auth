import React from 'react';
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({isOpen, onClose, onUpdateCard}) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleChangeName(e) {
    setName(e.target.value);
  };

  function handleChangeLink(e) {
    setLink(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateCard({
      name: name,
      link: link,
    });

    onClose();
  }

  return(
    <PopupWithForm name='card' title='Новое место' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} caption='Создать'>
    <label className="popup__input-area">
      <input type="text" value={name || ""} onChange={handleChangeName} name="cardName" className="popup__input popup__input_card_name" placeholder="Название" required />
      <span className="error-text" id="cardNameError"></span>
    </label>
    <label className="popup__input-area">
      <input type="url" value={link || ""} onChange={handleChangeLink} name="cardLink" className="popup__input popup__input_card_link" placeholder="Ссылка на картинку" required />
      <span className="error-text" id="cardLinkError"></span>
    </label>
  </PopupWithForm>
  )
}

export default AddPlacePopup;