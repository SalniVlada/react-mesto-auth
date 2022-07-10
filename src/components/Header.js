import logo from '../sprint-4-images/logo.svg';
import { Link } from 'react-router-dom';

function Header({email, link, authections, onClick}) {
  return(
    <header className="header">
      <img src={logo} className="header__logo" alt="Mesto"/>
      <div className="header__info">
        <p className="header__email">{email}</p>
        <Link to={link} className="header__auth" onClick={onClick}>{authections}</Link>
      </div>
    </header>
  )
}

export default Header;