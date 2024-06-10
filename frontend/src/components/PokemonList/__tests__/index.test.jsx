import{ render } from '@testing-library/react';
import PokemonList from '..';
import { listaTarjetas, pokemonSeleccionado } from './fixtures';

describe('Pruebas PokemonList', () => {
    it('Debe renderizar una lista de tarjetas de pokemon', async () => {   
        const { findByText } = render(<PokemonList lista={listaTarjetas} />);
        const mensaje = await findByText(listaTarjetas[0].name.toUpperCase());
        expect(mensaje).toBeInTheDocument();
    });
    
    it('Debe renderizar al pokemon seleccionado', async () => {
        const { findByText } = render(<PokemonList lista={[]} pokemonSeleccionado={[pokemonSeleccionado]} />);
        const mensaje = await findByText('PIKACHU');
        expect(mensaje).toBeInTheDocument();
    });
});