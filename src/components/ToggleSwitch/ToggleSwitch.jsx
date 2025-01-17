import React,{useContext, useState} from "react";
import './ToggleSwitch.css'
import { CurrentTemperatureUnitContext } from "../../context/CurrentTemperatureUnitContext";
function ToggleSwitch(){
    const {currentTemperatureUnit,handleToggleSwitchChange} = useContext(CurrentTemperatureUnitContext)
    return(
       <label className="switch">
         <input
        className="switch__box"
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <span
        className={
            currentTemperatureUnit === "F"
            ? "switch__slider switch__slider-F"
            : "switch__slider switch__slider-C"
        }
      ></span>
      <p
        className={`switch__temp_F ${
          currentTemperatureUnit === "F" && "switch__active"
        }`}
      >
        F
      </p>
      <p
        className={`switch__temp_C ${
          currentTemperatureUnit === "C" && "switch__active"
        }`}
      >
        C
      </p>
    </label>
    )
}
export default ToggleSwitch