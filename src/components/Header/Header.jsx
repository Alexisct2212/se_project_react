import "./Header.css";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { Link } from "react-router-dom";

function Header({ handleAddClick, weatherData }) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  return (
    <header className="header">
      <Link to="/">
      <img className="header__logo" src={logo} alt="header logo" />
      </Link>
      <p className="header__date_time">{currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch/>
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add_clothes"
        >
        + Add Clothes
      </button>
      <Link to="/profile" className="Profile__header-link">
      <div className="header__user_info">
        <p className="header__username">Terrence Tegegne</p>{" "}
        <img
          src={avatar}
          alt="Terrence Tegegne"
          className="header__user_avatar"
          /> 
      </div>
      </Link>
    </header>
  );
}

export default Header;