import rain__weather from "../../assets/rain__weather.png"
import "./WeatherCard.css"
function WeatherCard(){
    return(
    <section className="weather-card">
        <p className="weather-card__temp"> 75 &deg; F</p>
        <img src={rain__weather} alt="raining" className="weather__card-image" />
    </section>);
}
export default WeatherCard;