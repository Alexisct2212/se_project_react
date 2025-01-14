import "./SideBar.css";
import avatar from "../../assets/avatar.png";

function SideBar({handleEditModal}) {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__user">Terrence Tegegne</p>
      <div className="sidebar__buttons-options">
       <button className="sidebar__edit_profile" onClick={handleEditModal}>Change profile data</button>
       <button className="sidebar__logout" >Log out</button>
      </div>
    </div>
  );
}
export default SideBar;