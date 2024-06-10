import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from '../App';
import usePokemonAPI from '../hooks/usePokemonApi';

vi.mock('../hooks/usePokemonApi');

describe('Prueba de App.jsx', () => {
    usePokemonAPI.mockReturnValue({
        __esModule: true,
        errorMessage: '',
        buscarPokemon: vi.fn(),
        pokemonList: [{ 
            id:'string',
            name: 'string',
            abilities: [],
            sprites: {} }],
        pokemonSeleccionado: [], 
        setPokemonSeleccionado: vi.fn(),
        loading: true,
    });
    it('Deberá comparar Snapshot de App',  () => {
        const { asFragment } = render(<App />);
        expect(asFragment()).toMatchSnapshot();
    });
    it('Deberá mostrar Backdrop y CircularProgress cuando la carga es verdadera', async () => {
        render(<App />);

        await waitFor(() => {
            expect(screen.getByTestId('backdrop')).toBeInTheDocument();
        });
    });
})
