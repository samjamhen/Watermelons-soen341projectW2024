// TestContext.js
import React, { createContext, useContext, useState } from 'react';

const TestContext = createContext();

export const TestContextProvider = ({ children }) => {
  const [testData, setTestData] = useState([]);

  const addTestData = (data) => {
    setTestData((prevTestData) => [...prevTestData, data]);
  };

  const clearTestData = () => {
    setTestData([]);
  };

  return (
    <TestContext.Provider value={{ testData, addTestData, clearTestData }}>
      {children}
    </TestContext.Provider>
  );
};

export const useTestContext = () => useContext(TestContext);

