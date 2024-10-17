import React from "react";

const CurrentTemperatureUnitContext = React.createContext({
  currentTempUnit: "C",
  handleToggleSwitchChange: () => {},
});

export  {CurrentTemperatureUnitContext};