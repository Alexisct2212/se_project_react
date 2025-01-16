import "./SideBar.css";
import CurrentUserContext from "../../context/CurrentUserContext";
import { useContext } from "react";
import avatar from "../../assets/avatar.png";
function SideBar({handleEditModal,handleSignout}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={currentUser.avatar} alt="Default avatar" />
      <p className="sidebar__user">{currentUser.name}</p>
      <div className="sidebar__buttons-options">
       <button className="sidebar__edit_profile" onClick={handleEditModal}>Change profile data</button>
       <button className="sidebar__logout" onClick={handleSignout} >Log out</button>
      </div>
    </div>
  );
}
export default SideBar;