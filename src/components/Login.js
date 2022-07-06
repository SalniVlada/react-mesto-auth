import React from 'react';

function Login() {

  return(
    <div className="login">
      <p className="login__title">Вход</p>
      <form className="login__form">
        <input className="login__input" placeholder="Email" name="username" type="text" required />
        <input className="login__input" placeholder="Пароль" name="password" type="password" required />
        <div className="login__button-container">
          <button type="submit" className="login__link">Войти</button>
        </div>
      </form>
    </div>
  )
}

export default Login;