import React, { useContext } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { WeatherContext } from '../context/WeatherContext'; 

const WeatherDisplay = () => {
  const { dadosClima } = useContext(WeatherContext);
  console.log('Dados do contexto:', dadosClima); 

  if (!dadosClima || !dadosClima.properties || !dadosClima.properties.periods) {
    return (
      <Typography sx={{ mt: 4, color: 'red' }}>
        Não há dados disponíveis para exibição. Verifique a estrutura dos dados retornados.
      </Typography>
    );
  }

  const periods = dadosClima.properties.periods;

  return (
    <Box
      sx={{
        mt: 4,
        p: 3,
        border: '1px solid #ccc',
        borderRadius: 2,
        backgroundColor: '#fff',
        maxWidth: 600,
        margin: '0 auto',
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

export default WeatherDisplay;
