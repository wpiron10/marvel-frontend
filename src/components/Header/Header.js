import "./Header.css";
import logo from "../../assets/img/logo-marvel.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="main-header">
      <div className="logo-content">
        <Link to={`/`} className="logo-link">
          <img src={logo} alt="logo - marvel" className="logo" />
        </Link>
      </div>
      <div>
        <ul className="main-menu">
          <li className="menu-btn">
            <Link to="/comics">
              <h2>Comics</h2>
            </Link>
          </li>
          <li className="menu-btn">
            <Link to="/characters">
              <h2>Personnages</h2>
            </Link>
          </li>
          <li className="menu-btn">
            <Link to="/favorites">
              <h2>Mes favoris</h2>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
