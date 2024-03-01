import { createContext, useReducer } from "react";

export const VehicleContext = createContext();

export const vehicleReducer = (state = { vehicles: [] }, action) => {
  switch (action.type) {
    case "SET_VEHICLES":
      return {
        vehicles: action.payload,
      };
    case "CREATE_VEHICLES":
      return {
        vehicles: [...state.vehicles, action.payload],
      };
    case "DELETE_VEHICLE":
      return {
        vehicles: state.vehicles.filter((v) => v._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const VehicleContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(vehicleReducer, {
    vehicles: [],
  });

  return (
    <VehicleContext.Provider value={{ state, dispatch }}>
      {children}
    </VehicleContext.Provider>
  );
};
