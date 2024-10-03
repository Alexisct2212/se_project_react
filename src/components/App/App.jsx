import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import { coordinates, APIKey } from "../../utils/Constants";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Footer from "../Footer/Footer";
import ItemModal from "../itemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/WeatherApi";
function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
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
      <div className="page__content">
        <Header handleAddClick={handleAddClick} weatherData={weatherData} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        activeModal={activeModal}
        onClose={closeActiveModal}
        isOpen={activeModal === "add-garment"}
      >
        <label htmlFor="name" className="modal__label">
          Name{""}
        </label>
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
        />
        <label htmlFor="imageURL" className="modal__label">
          Image{""}
        </label>
        <input
          type="Url"
          className="modal__input"
          id="imageURL"
          placeholder="Image URL"
        />
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className=" modal__label_type_radio">
            <input
              type="radio"
              className="modal__radio-input"
              id="hot"
              name="weatherType"
            />
            Hot
          </label>
          <label htmlFor="warm" className=" modal__label_type_radio">
            <input
              type="radio"
              className="modal__radio-input"
              id="warm"
              name="weatherType"
            />
            Warm
          </label>
          <label htmlFor="cold" className="modal__label_type_radio">
            <input
              type="radio"
              className="modal__radio-input"
              id="cold"
              name="weatherType"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeActiveModal}
      />
      <Footer />
    </div>
  );
}

export default App;
