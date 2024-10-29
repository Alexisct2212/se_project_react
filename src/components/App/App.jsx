import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import { coordinates, APIKey } from "../../utils/Constants";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Footer from "../Footer/Footer";
import ItemModal from "../itemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";
import AddItemModal from "../AddItemModal/AddItemModal";
import Profile from "../profile/Profile";
import { getItems, addItem, deleteItem } from "../../utils/Api";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import {items} from "../../../db.json"
function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  //open & close functions
  const handleAddClick = () => {
    setActiveModal("add-garment");
  };
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  const closeActiveModal = () => {
    setActiveModal("");
    setSelectedCard({});
  };
  
  // add item function
  const handleAddItemSubmit = (newItem) => {
    addItem(newItem)
      .then((addedItem) => {
        setClothingItems([addedItem, ...clothingItems]);

        closeActiveModal();
      })
      .catch((error) => console.error("Error adding item:", error));
  };
  //delete functions
  const handleDeleteCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("delete-confirmation");
  };
  const handleDeleteCard = (card) => {
    deleteItem(card)
      .then(() => {
        setClothingItems((cards) => cards.filter((c) => c._id !== card._id));
        closeActiveModal();
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  // toggle function for temperature
  const handleToggleSwitchChange = () => {
    if (currentTemperatureUnit === "C") setCurrentTemperatureUnit("F");
    if (currentTemperatureUnit === "F") setCurrentTemperatureUnit("C");
  };
  //
  useEffect(() => {
    getWeather(coordinates, APIKey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
    getItems()
      .then((items) => setClothingItems(items))
      .catch((error) => console.error("Error fetching items:", error));
  }, []);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            clothingItems={clothingItems}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  items={items}
                 />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  onCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  items={items}
                />
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
          handleDelete={() => handleDeleteCardClick(selectedCard)}
        />
        <Footer />
        <DeleteConfirm
          activeModal={activeModal}
          closeActiveModal={closeActiveModal}
          handleDeleteCard={handleDeleteCard}
          selectedCard={selectedCard}
        />
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;
