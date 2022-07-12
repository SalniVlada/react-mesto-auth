import logo from '../sprint-4-images/logo.svg';
import {useEffect, useState} from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header({email}) {
  const [path, setPath] = useState('');

  const location = useLocation();
  useEffect(() => {
    setPath(location.pathname);
  }, [location]);

  let linkText = '';
  let link = '';
  let isEmailVisible = false;
  if (path == "/sign-up") {
    linkText = 'Войти';
    link = '/sign-in';
    isEmailVisible = false;
  } else if (path == "/sign-in") {
    linkText = 'Регистрация';
    link = '/sign-up';
    isEmailVisible = false;
  } else {
    linkText = 'Выйти';
    link = '/sign-in';
    isEmailVisible = true;
  }

  function signOut() {
    localStorage.removeItem('jwt');
  }

  return(
    <header className="header">
      <img src={logo} className="header__logo" alt="Mesto"/>
      <div className="header__info">
        <p className="header__email">{isEmailVisible ? email : ''}</p>
        <Link to={link} className="header__auth" onClick={signOut}>{linkText}</Link>
      </div>
    </header>
  )
}

export default Header;