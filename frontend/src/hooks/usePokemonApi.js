import { useEffect, useState } from 'react';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const usePokemonAPI = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [pokemonSeleccionado, setPokemonSeleccionado] = useState([]);
  const [loading, setLoading] = useState(false);

  const getPokemonesIniciales = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${baseURL}/iniciales`);
      const pokemonListData = await response.json();
      setPokemonList(pokemonListData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  useEffect(() => {
    getPokemonesIniciales();
  }, []);

  const buscarPokemon = async (query) => {
    setErrorMessage('');
    let url;

    if (!isNaN(query)) {
      const id = parseInt(query, 10);
      if (id < 1 || id > 1000) {
        setErrorMessage('ID de Pokémon no válido. Debe ser un número entre 1 y 1000.');
        return;
      }
      url = `${baseURL}/id/${id}`;
    } else {
      if (!query.match(/^[a-zA-Z0-9-]+$/i)) {
        setErrorMessage('Nombre de Pokémon no válido. Solo se permiten letras, números y guiones.');
        return;
      }
      url = `${baseURL}/nombre/${query}`;
    }

    try {
      setLoading(true);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('No se pudo obtener el Pokémon. Por favor, inténtalo de nuevo.');
      }
      const pokemon = await response.json();
      const newArrayPokemones = [pokemon];
      setPokemonSeleccionado(newArrayPokemones);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return {
    errorMessage, buscarPokemon, pokemonList, pokemonSeleccionado, setPokemonSeleccionado, loading,
  };
};

export default usePokemonAPI;
