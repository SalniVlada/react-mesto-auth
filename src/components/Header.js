import logo from '../sprint-4-images/logo.svg';

function Header() {
  return(
    <header className="header">
      <img src={logo} className="header__logo" alt="Mesto"/>
    </header>
  );
}

export default Header;