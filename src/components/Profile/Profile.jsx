import SideBar from "../SideBar/SideBar"
import ClothesSection from "../ClothesSection/ClothesSection"
import "./Profile.css"
function Profile ({onCardClick,handleAddClick}){
    return(<div className="profile">
        <section className="profile__sidebar">
            <SideBar/>
        </section>
        <section className="profile__clothig-items">
        <ClothesSection onCardClick={onCardClick} handleAddClick={handleAddClick}/>
        </section>
    </div>)
}
export default Profile