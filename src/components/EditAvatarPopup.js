import {useEffect, useRef} from 'react';
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {

  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });

    onClose();
  }

  return(
    <PopupWithForm name='avatar' title='Обновить аватар' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} caption='Сохранить'>
    <label className="popup__input-area">
      <input type="url" ref={avatarRef} name="avatarLink" className="popup__input popup__input_avatar_link" placeholder="Ссылка на аватар" required />
      <span className="error-text" id="avatarLinkError"></span>
    </label>
  </PopupWithForm>
  )
}

export default EditAvatarPopup;