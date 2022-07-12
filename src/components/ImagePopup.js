function ImagePopup({card, onClose}) {
  
  const name = card ? card.name : null
  const link = card ? card.link : null
  
  return(
    <div className={`popup popup_image ${card && 'popup_opened'}`}>
      <div className="popup__container popup__container_image" onClick={onClose}>
        <button type="button" className="popup__close popup__close_image"></button>
        <img src={link} alt={name} className="popup__image-layer" />
        <h2 className="popup__image-title">{name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;