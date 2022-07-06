import React from 'react';

function Register() {

  return(
    <div className="register">
      <p className="register__title">Регистрация</p>
      <form className="register__form">
        <input className="register__input" placeholder="Email" name="userName" type="text" required />
        <input className="register__input" placeholder="Пароль" name="password" type="password" required />
        <div className="register__button-container">
          <button type="submit" className="register__link">Зарегистрироваться</button>
        </div>
      </form>
      <div className="register__signup">
        <p className="register__signup-text">Уже зарегистрированы?</p>
        <Link to="login" className="register__signup-link">Войти</Link>
      </div>
    </div>
  )
}

export default Register;