import './App.css';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PokemonList from './components/PokemonList';
import SearchBar from './components/SearchBar/index';
import usePokemonAPI from './hooks/usePokemonApi';

function App() {
  const {
    errorMessage, buscarPokemon, pokemonList, pokemonSeleccionado, setPokemonSeleccionado, loading,
  } = usePokemonAPI();

  return (
    <>

      <SearchBar
        onSearch={buscarPokemon}
        setPokemonSeleccionado={setPokemonSeleccionado}
        errorMessage={errorMessage}
      />
      {loading
      && (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
        data-testid="backdrop"
      >
        <CircularProgress color="inherit" data-testid="progressbar" />
      </Backdrop>
      )}
      <PokemonList lista={pokemonList} pokemonSeleccionado={pokemonSeleccionado} />
    </>

  );
}

export default App;
