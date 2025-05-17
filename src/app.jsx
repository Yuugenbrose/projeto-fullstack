import React from 'react';
import Formulario from './components/Formulario';
import WeatherDisplay from './components/WeatherDisplay'; // Importar

const App = () => {
  return (
    <div>
      <Formulario />
      <WeatherDisplay /> {/* Adicionar */}
    </div>
  );
};

export default App;
