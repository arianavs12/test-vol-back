const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config({ path: '../.env' });
const app = express();
const PORT = 8000;

const corsOptions = {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));

// Endpoint para obtener películas populares
app.get('/api/popular', async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.API_URL}/movie/popular`,
      {
        params: {
          api_key: process.env.API_KEY,
          language: process.env.API_LANGUAGE,
        },
      }
    );
    res.json(response.data.results);
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ error: 'Error al obtener películas populares.' });
  }
});

// Endpoint para buscar películas por título
app.get('/api/search', async (req, res) => {
  const { title } = req.query;

  try {
    const response = await axios.get(
      `${process.env.API_URL}/search/movie`,
      {
        params: {
          api_key: process.env.API_KEY,
          language: process.env.API_LANGUAGE,
          query: title,
        },
      }
    );

    res.json(response.data.results);
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ error: 'Error al buscar películas.' });
  }
});

app.get('/api/movie/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const response = await axios.get(
      `${process.env.API_URL}/movie/${id}`, 
      {
        params: {
          api_key: process.env.API_KEY,
          language: process.env.API_LANGUAGE,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching movie details:', error);
    res.status(500).json({ error: 'Error al obtener detalles de la película.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor backend en http://localhost:${PORT}`);
});

