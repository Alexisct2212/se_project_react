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
import { getItems, addItem, deleteItem,login,registerUser } from "../../utils/Api";
import DeleteConfirm from "../DeleteConfirm/DeleteConfirm";
import {items} from "../../../db.json"
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import CurrentUserContext from "../../context/CurrentUserContext";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
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
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
  const handleLoginModal = ()=>{
    setActiveModal("login");
  }
  const handleRegisterModal=()=>{
    setActiveModal("signup")
  }

  // add item function
  const handleAddItemSubmit = (newItem,resetForm) => {
    addItem(newItem)
      .then((addedItem) => {
        setClothingItems([addedItem, ...clothingItems]);
        resetForm();
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
      .catch((error) => console.error("Error Deleting item:", error));
  };

  //login Function 
  const handleLogin = ({ email, password }) => {
    logIn({ email, password })
      .then((res) => {
        if (!res.token) throw new Error("Token not received");
        localStorage.setItem("jwt", res.token);
        return getUserProfile(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        navigate("/profile");
        closeModal();
      })
      .catch((err) => console.error("Login error:", err));
  };
  //register new users 
  const handleRegister = (user) => {
    register(userData)
      .then(() =>
        handleLogin({ email: user.email, password: user.password })
      )
      .catch(console.error);
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
      <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            weatherData={weatherData}
            handleLoginModal={handleLoginModal}
            handleRegisterModal={handleRegisterModal}
            clothingItems={clothingItems}
            isLoggedIn={isLoggedIn}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                  items={items}
                  isLoggedIn={isLoggedIn}
                 />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Profile
                  onCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                  items={items}
                />
            </ProtectedRoute>
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
        <LoginModal
        activeModal={activeModal}
        closeActiveModal={closeActiveModal}
        isOpen={activeModal==="login"}
        onLogIn={handleLogin}
        />
        <RegisterModal 
        activeModal={activeModal}

       closeActiveModal={closeActiveModal}
        isOpen={activeModal==="signup"}
        onRegister={handleRegister}
        />
      </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
