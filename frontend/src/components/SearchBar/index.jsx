import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box } from '@mui/material';
import pokeLogo from '../../assets/klipartz.com.png';

function SearchBar({ onSearch, setPokemonSeleccionado, errorMessage }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query.length === 0) setPokemonSeleccionado([]);
  }, [query, setPokemonSeleccionado]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <div className="container" data-testid="search-bar">
      <img src={pokeLogo} alt="Logo de Pokémon" />
      <h1>Busca un Pokémon</h1>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={2}
      >
        <TextField
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          label="Introduce un Pokenombre o ID"
          variant="outlined"
        />
        <Button type="submit" variant="contained" color="primary">
          Buscar
        </Button>
      </Box>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

    </div>
  );
}

SearchBar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  setPokemonSeleccionado: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
};

SearchBar.defaultProps = {
  errorMessage: '',
};

export default SearchBar;
