import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { WeatherProvider } from './context/WeatherContext'; // Importar o Provider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WeatherProvider>
      <App />
    </WeatherProvider>
  </React.StrictMode>
);
