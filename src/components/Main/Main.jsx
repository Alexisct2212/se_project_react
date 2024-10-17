import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import { defaultClothingItems } from "../../utils/Constants";
import ItemCard from "../itemcard/ItemCard";
import { CurrentTemperatureUnitContext } from "../context/CurrentTemperatureUnitContext";
import { useContext } from "react";
function Main({ weatherData, handleCardClick }) {
  const {currentTemperatureUnit}= useContext(CurrentTemperatureUnitContext);

  const displayTemp =
  currentTemperatureUnit === "F" ? weatherData.temp.F : weatherData.temp.C;
  return (
    <main>
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {displayTemp} &deg; {currentTemperatureUnit} / You may want to wear;
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => item.weather === weatherData.type)
            .map((item) => (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
              />
            ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
