import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTemperatureUnit: "C",
  handleToggleSwitchChange: () => {},
});

export  {CurrentTemperatureUnitContext};