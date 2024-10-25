import { useEffect, useState } from "react";
import { Routes,Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import { coordinates, APIKey } from "../../utils/Constants";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Footer from "../Footer/Footer";
import ItemModal from "../itemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import {CurrentTemperatureUnitContext} from '../context/CurrentTemperatureUnitContext';
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../profile/Profile";
function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit]= useState("F");
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const closeActiveModal = () => {
    setActiveModal("");
  };
  const handleAddItemSubmit = (newItem) => {
    addItem(newItem)
      .then((addedItem) => {
        setClothingItems([addedItem, ...defaultClothingItems]);
        closeActiveModal();
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  const handleToggleSwitchChange = ()=>{
    if(currentTemperatureUnit === "C") setCurrentTemperatureUnit('F')
      if(currentTemperatureUnit ==="F") setCurrentTemperatureUnit("C")
  }
  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);


  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider value={{currentTemperatureUnit,handleToggleSwitchChange}}>
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile onCardClick={handleCardClick}/>
              }
            />
          </Routes>
      </div>
      <AddItemModal 
      closeActiveModal={closeActiveModal} 
      isOpen={activeModal === "add-garment"}
      handleAddItemSubmit={handleAddItemSubmit}
      />
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
      <Footer />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
