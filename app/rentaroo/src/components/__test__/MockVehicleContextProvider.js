import React, { createContext, useContext } from 'react';

const VehicleContext = createContext({
  vehicles: [],
  dispatch: () => {},
});

export const MockVehicleContextProvider = ({ children, value }) => {
  return (
    <VehicleContext.Provider value={value}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicleContext = () => useContext(VehicleContext);