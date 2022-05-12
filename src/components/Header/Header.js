import "./Header.css";
import logo from "../../assets/img/logo-marvel.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="main-header">
      <div className="logo-content">
        <img src={logo} className="logo" alt="logo - marvel" />
      </div>
      <div>
        <ul>
          <li>
            <Link to="/comics">Comics</Link>
          </li>
          <li>
            <Link to="/characters">Personnages</Link>
          </li>
          <li>
            <Link to="/favorites">Favoris</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
