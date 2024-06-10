import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TarjetaPokemon from '..';
import { pokemonSeleccionadoTarjeta } from './fixtures';

describe('Pruebas TarjetaPokemon', () => {
    it('Renderiza correctamente con los datos proporcionados', async () => {

      render(<TarjetaPokemon pokemon={pokemonSeleccionadoTarjeta} />);
      
      const tarjeta = screen.getByRole('img');
      const nameElement = screen.getByText('BULBASAUR');
      const infoButton = screen.getByLabelText('Ver información');
      fireEvent.mouseOver(infoButton);
      const tooltip = await waitFor(() => screen.getByRole('tooltip'));

      expect(tarjeta).toBeInTheDocument();
      expect(tarjeta).toHaveAttribute('src', 'string');
      expect(nameElement).toBeInTheDocument();
      expect(tooltip).toHaveTextContent('CHLOROPHYLL');
      });
});