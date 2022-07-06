function PopupWithForm({name, title, caption, isOpen, onClose, onSubmit, children}) { 

  return(
  <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
    <div className={`popup__container popup__container_${name}`}>
      <button type="button" className={`popup__close popup__close_${name}`} onClick={onClose}></button>
      <h2 className={`popup__title popup__title_${name}`}>{title}</h2>
      <form name="myForm" className={`form form_${name}`} onSubmit={onSubmit}>
        {children}
        <button type="submit" className={`popup__save popup__save_${name}`}>{caption}</button>
      </form>
    </div>
  </div>
  );
}

export default PopupWithForm;