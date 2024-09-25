import {useState} from "react"
import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
function App(){
    const [WeatherData, setWeatherData] = useState({type:"cold"});
    return (
    <div className='page'>
     <div className="page__content">
        <Header/>
        <Main WeatherData={WeatherData}/>
     </div>
    </div>);
}


export default App;
