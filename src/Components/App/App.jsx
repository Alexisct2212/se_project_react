import {useState} from "react"
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import Footer from "../Footer/Footer";
function App(){
    const [WeatherData, setWeatherData] = useState({type:"cold"});
    return (
    <div className='page'>
     <div className="page__content">
        <Header/>
        <Main WeatherData={WeatherData}/>
     </div>
     <ModalWithForm title="New garment" buttonText="Add garment">
     <label htmlFor="name" className="modal__label">Name{""}</label>
            <input type="text" className="modal__input" id="name" placeholder="Name"/>
            <label htmlFor="imageURL" className="modal__label">Image{""}</label>
            <input type="Url" className="modal__input" id="imageURL" placeholder="Image URL"/>
            <fieldset className="modal__radio-buttons">
                <legend className="modal__legend">Select the weather type:</legend>
                <label htmlFor="hot" className=" modal__label_type_radio">
                    <input type="radio" className="modal__radio-input" id="hot"/>Hot
                </label>
                <label htmlFor="warm" className=" modal__label_type_radio">
                    <input type="radio" className="modal__radio-input" id="hot"/>Warm
                </label>
                <label htmlFor="cold" className="modal__label_type_radio">
                    <input type="radio" className="modal__radio-input" id="hot"/>Cold
                </label>
            </fieldset>
     </ModalWithForm>
     <Footer/>
    </div>);
}


export default App;
