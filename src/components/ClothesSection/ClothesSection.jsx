import "./ClothesSection.css"
import { defaultClothingItems } from "../../utils/Constants"
import ItemCard from "../itemcard/ItemCard"
function ClothesSection ({ onCardClick}){
    return(
        <div className="clothes__section">
            <div className="clothes__section-header">
            <p className="clothes__section_p"> Your items</p>
            <button className="clothes__section_button">+ Add items</button>
        </div>
        <ul className="cards__list">
          {defaultClothingItems.map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={onCardClick}
              />
            ))}
        </ul>
        </div>
    )
}
export default ClothesSection