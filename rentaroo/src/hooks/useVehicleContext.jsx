import { VehicleContext } from "../context/VehicleContext";
import { useContext } from "react";

export const useVehicleContext = () => {
  const context = useContext(VehicleContext);

  if (!context) {
    throw new Error(
      "useVehicleContext must be used within a VehicleContextProvider"
    );
  }
  return context;
};
