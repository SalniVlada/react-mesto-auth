import success from '../sprint-4-images/success.png';
import error from '../sprint-4-images/error.png';

function InfoTooltip({isVisible, isSuccess, onClose}) {

  return(
    <div className={`infoTooltip ${isVisible && "infoTooltip_opened"}`}>
      <div className="infoTooltip__container">
        <button type="button" className="infoTooltip__close" onClick={onClose}></button>
        <img src={isSuccess ? success : error} className="infoTooltip__icon" />
        <h2 className="infoTooltip__text">{isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;