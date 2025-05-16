import React, { useRef, useContext } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import CloudIcon from '@mui/icons-material/Cloud';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import fundo from '../assets/images/clima.jpg';
import { WeatherContext } from '../context/WeatherContext'; 
const Formulario = () => {
  const cidadeRef = useRef();
  const { setDadosClima, erro, setErro } = useContext(WeatherContext); 

  const handleSubmit = async (e) => {
  console.log("Iniciando busca...");
  e.preventDefault();
  const cidade = cidadeRef.current.value.trim();

  if (!cidade) {
    setErro('Por favor, insira o nome de uma cidade.');
    return;
  }

  setErro('');
  try {
    const geoRes = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        cidade
      )}&format=json&limit=1`
    );
    const geoData = await geoRes.json();
    console.log("GeoData:", geoData);

    if (!geoData.length) {
      throw new Error('Cidade não encontrada. Verifique o nome e tente novamente.');
    }

    const { lat, lon } = geoData[0];
    const response = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
    if (!response.ok) throw new Error('Erro ao buscar dados da API.');

    const data = await response.json();
    const forecastUrl = data.properties.forecast;

    const forecastRes = await fetch(forecastUrl);
    if (!forecastRes.ok) throw new Error('Erro ao buscar previsão detalhada.');

    const forecastData = await forecastRes.json();
    console.log("forecastData:", forecastData); 

    setDadosClima(forecastData); 
  } catch (error) {
    console.error('Erro:', error.message);
    setErro(error.message || 'Erro ao buscar os dados climáticos.');
  }
};


  return (
    <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'auto' }}>
      {/* Fundo */}
      <Box
        sx={{
          backgroundImage: `url(${fundo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.3,
          zIndex: 0,
        }}
      />

      {/* Formulário */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 3,
            width: '100%',
            maxWidth: 400,
            p: 4,
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 3,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
          }}
        >
          <Typography variant="h5" textAlign="center">
            Buscar Clima <WbSunnyIcon /> <ThunderstormIcon /> <CloudIcon /> <ThermostatIcon />
          </Typography>

          {erro && <Alert severity="error">{erro}</Alert>}

          <TextField
            label="Nome da Cidade"
            variant="outlined"
            inputRef={cidadeRef}
          />

          <Button type="submit" variant="contained" color="primary" endIcon={<SearchIcon />}>
            Buscar
          </Button>
        </Box>
      </Box>
    </Box>
  );
  
};

export default Formulario;
