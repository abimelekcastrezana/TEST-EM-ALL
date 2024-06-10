const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_BASE_URL = process.env.POKE_API_URL;


router.get('/nombre/:nombre', async (req, res) => {
  const nombrePokemon = req.params.nombre.toLowerCase();

  if (!nombrePokemon.match(/^[a-zA-Z0-9-]+$/)) {
    res.status(400).json({ error: 'Nombre de Pokémon no válido' });
    return;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${nombrePokemon}`);
    const data = response.data;
    res.json({id: data.id, name: data.name, abilities: data.abilities, sprites: data.sprites});
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'No se encontró el Pokémon.' });
    } else {
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
});

router.get('/id/:id', async (req, res) => {
  const idPokemon = req.params.id;

  if (isNaN(idPokemon) || idPokemon < 1 || idPokemon > 1000) {
    res.status(400).json({ error: 'ID de Pokémon no válido' });
    return;
  }

  try {
    const response = await axios.get(`${API_BASE_URL}/pokemon/${idPokemon}`);
    const data = response.data;
    res.json({id: data.id, name: data.name, abilities: data.abilities, sprites: data.sprites});
  } catch (error) {
    if (error.response && error.response.status === 404) {
      res.status(404).json({ error: 'No se encontró el Pokémon.' });
    } else {
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  }
});

router.get('/iniciales', async (req, res) => {
  try {
    const pokemonList = [];
    const responseGeneral = await axios.get(`${API_BASE_URL}/pokemon?limit=50&offset=0`);
    const pokemones = responseGeneral.data.results;
    for(let i= 0; i< pokemones.length; i++){
      const detalle = await axios.get(pokemones[i].url);
      pokemonList.push({...pokemones[i],id: detalle.data.id, abilities: detalle.data.abilities, sprites: detalle.data.sprites})
    }
    res.json(pokemonList);
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
});

module.exports = router;