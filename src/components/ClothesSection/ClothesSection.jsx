import "./ClothesSection.css"
import { defaultClothingItems } from "../../utils/Constants"
import {items} from "../../../db.json"
import ItemCard from "../itemcard/ItemCard"
function ClothesSection ({ onCardClick,handleAddClick}){
    return(
        <div className="clothes__section">
            <div className="clothes__section-header">
            <p className="clothes__section_p"> Your items</p>
            <button className="clothes__section_button" onClick={handleAddClick}>+ Add items</button>
        </div>
        <ul className="cards__list">
          {items.map((items) => (
              <ItemCard
                key={items._id}
                item={items}
                onCardClick={onCardClick}
              />
            ))}
        </ul>
        </div>
    )
}
export default ClothesSection