import "./Main.css"
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../Utils/Constants";
import ItemCard from "../itemcard/ItemCard";
function Main({WeatherData}){
    return(
    <main>
    <WeatherCard/>
    <section className="cards">
        <p className="cards__text">Today is 75 &deg; F / You may want to wear;</p>
        <ul className="cards__list">
          {defaultClothingItems
           // .filter((item) => item.weather === WeatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
              />
            ))}
        </ul>
    </section>
    </main>);
}
export default Main;