import PropTypes from 'prop-types';
import { Box, Grid, Container } from '@mui/material';
import TarjetaPokemon from '../TarjetaPokemon';

function PokemonList({ lista, pokemonSeleccionado }) {
  const listado = pokemonSeleccionado.length === 0 ? lista : pokemonSeleccionado;

  return (
    <Container maxWidth="xl" data-testid="pokemon-list">
      <Box overflow="auto" p={1}>

        <Grid container spacing={3}>
          {listado.map((pokemon) => (
            <Grid key={pokemon.id} item xs={12} sm={6} md={3} lg={2}>
              <TarjetaPokemon
                pokemon={pokemon}
              />
            </Grid>
          ))}
        </Grid>

      </Box>
    </Container>
  );
}

const pokemonType = PropTypes.shape({
  name: PropTypes.string.isRequired,
  abilities: PropTypes.arrayOf(
    PropTypes.shape({
      ability: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }),
  ).isRequired,
  sprites: PropTypes.shape({
    front_default: PropTypes.string.isRequired,
  }).isRequired,
});

PokemonList.propTypes = {
  lista: PropTypes.arrayOf(pokemonType),
  pokemonSeleccionado: PropTypes.arrayOf(pokemonType),
};

PokemonList.defaultProps = {
  lista: [],
  pokemonSeleccionado: [],
};

export default PokemonList;
