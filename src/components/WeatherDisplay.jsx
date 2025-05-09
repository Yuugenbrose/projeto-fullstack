import React from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';

const WeatherDisplay = ({ dados }) => {
  console.log('Dados recebidos pelo WeatherDisplay:', dados);

  if (!dados || !dados.properties || !dados.properties.periods) {
    return (
      <Typography sx={{ mt: 4, color: 'red' }}>
        Não há dados disponíveis para exibição. Verifique a estrutura dos dados retornados.
      </Typography>
    );
  }

  const periods = dados.properties.periods;

  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Previsão do Tempo
      </Typography>
      <List>
        {periods.map((period) => (
          <ListItem key={period.number}>
            <ListItemText
              primary={`${period.name}: ${period.temperature}°${period.temperatureUnit}`}
              secondary={period.detailedForecast}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const App = ({ dadosClima }) => {
  return (
    <>
      {dadosClima && console.log('Dados passados para WeatherDisplay:', dadosClima)}
      {dadosClima && (
  <Box sx={{ position: 'absolute', top: 16, left: 16, zIndex: 2 }}>
    <WeatherDisplay dados={dadosClima} />
  </Box>
)}

    </>
  );
};
export default WeatherDisplay;
