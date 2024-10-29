import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/Constants";
import ItemCard from "../itemcard/ItemCard";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";
import { useContext } from "react";
function Main({ weatherData, handleCardClick,items}) {
  const {currentTemperatureUnit}= useContext(CurrentTemperatureUnitContext);
  const displayTemp =
  currentTemperatureUnit === "F" ? weatherData.temp.F : weatherData.temp.C;
  const reverseItems = [...items].reverse();
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {displayTemp} &deg; {currentTemperatureUnit} / You may want to wear;
        </p>
        <ul className="cards__list">
          {reverseItems
            .filter((items) => items.weather === weatherData.type)
            .map((items) => (
              <ItemCard
                key={items._id}
                item={items}
                onCardClick={handleCardClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
