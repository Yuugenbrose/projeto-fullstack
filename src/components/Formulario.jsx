import React, { useRef, useState } from 'react';
import { TextField, Button, Box, Typography, Alert } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import CloudIcon from '@mui/icons-material/Cloud';
import ThermostatIcon from '@mui/icons-material/Thermostat';
import fundo from '../assets/images/clima.jpg';
import WeatherDisplay from './WeatherDisplay';

const Formulario = () => {
  const cidadeRef = useRef();
  const [erro, setErro] = useState('');
  const [dadosClima, setDadosClima] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cidade = cidadeRef.current.value.trim();

    if (!cidade) {
      setErro('Por favor, insira o nome de uma cidade.');
      return;
    }

    setErro('');
    try {
      console.log('Buscando coordenadas para a cidade:', cidade);
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          cidade
        )}&format=json&limit=1`
      );
      const geoData = await geoRes.json();
      console.log('Dados de geocoding:', geoData);

      if (!geoData.length) {
        throw new Error('Cidade não encontrada. Verifique o nome e tente novamente.');
      }
      const { lat, lon } = geoData[0];
      console.log('Coordenadas obtidas:', { lat, lon });
      const response = await fetch(`https://api.weather.gov/points/${lat},${lon}`);
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da API.');
      }

      const data = await response.json();
      console.log('Dados do endpoint /points:', data);
      const forecastUrl = data.properties.forecast;
      console.log('URL da previsão detalhada:', forecastUrl);
      const forecastRes = await fetch(forecastUrl);
      if (!forecastRes.ok) {
        throw new Error('Erro ao buscar previsão detalhada.');
      }
      const forecastData = await forecastRes.json();
      console.log('Dados da previsão detalhada:', forecastData);
      setDadosClima(forecastData);
      console.log('Estado atualizado com os dados climáticos:', forecastData);
    } catch (error) {
      console.error('Erro:', error);
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

      {/* Exibição dos dados climáticos */}
      {dadosClima && console.log('Dados passados para WeatherDisplay:', dadosClima)}
      {dadosClima && <WeatherDisplay dados={dadosClima} />}
      {dadosClima && console.log('Dados recebidos pelo WeatherDisplay:', dadosClima)}
    </Box>
  );
};

export default Formulario;
