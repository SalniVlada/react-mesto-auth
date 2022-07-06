import success from '../sprint-4-images/success.png';
import error from '../sprint-4-images/error.png';

function InfoTooltip({}) {

  return(
    <div className="infoTooltip">
      <div className="infoTooltip__container">
        <button type="button" className="infoTooltip__close" ></button>
        <img src={success} alt="Успешно" className="infoTooltip__photo" />
        <h2 className="infoTooltip__title">Вы успешно зарегестрировались!</h2>
      </div>
    </div>
  )
}

export default InfoTooltip;