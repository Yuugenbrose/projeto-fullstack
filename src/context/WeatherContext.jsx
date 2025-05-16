import React, { createContext, useState } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [dadosClima, setDadosClima] = useState(null);
  const [erro, setErro] = useState('');

  return (
    <WeatherContext.Provider value={{ dadosClima, setDadosClima, erro, setErro }}>
      {children}
    </WeatherContext.Provider>
  );
};
