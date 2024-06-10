import{ fireEvent, render, screen} from '@testing-library/react';
import SearchBar from '..';

describe('Pruebas SearchBar', () => {
    it('Renderiza el componente SearchBar correctamente', () => {
        render(<SearchBar onSearch={() => {}} setPokemonSeleccionado={() => {}} errorMessage="" />);
        const tituloSearchBar = screen.getByText('Busca un Pokémon');
        expect(tituloSearchBar).toBeInTheDocument();
      });
    
      it('Activa la función onSearch cuando se envía el formulario', () => {
        const mockOnSearch = vi.fn();
        render(<SearchBar onSearch={mockOnSearch} setPokemonSeleccionado={() => {}} errorMessage="" />);
        const inputBusqueda = screen.getByLabelText('Introduce un Pokenombre o ID');
        const botonBusqueda = screen.getByRole('button', { name: 'Buscar' });
    
        fireEvent.change(inputBusqueda, { target: { value: 'pikachu' } });
        fireEvent.click(botonBusqueda);
    
        expect(mockOnSearch).toHaveBeenCalledWith('pikachu');
      });
    
      it('Borra la consulta y la selección de pokemon cuando el input está vacío', () => {
        const mockSetPokemonSeleccionado = vi.fn();
        render(<SearchBar onSearch={() => {}} setPokemonSeleccionado={mockSetPokemonSeleccionado} errorMessage="" />);
        const inputBusqueda = screen.getByLabelText('Introduce un Pokenombre o ID');
    
        fireEvent.change(inputBusqueda, { target: { value: '' } });
    
        expect(mockSetPokemonSeleccionado).toHaveBeenCalledWith([]);
      });
    
      it('Muestra un mensaje de error si se proporciona el prop errorMessage', () => {
        render(<SearchBar onSearch={() => {}} setPokemonSeleccionado={() => {}} errorMessage="Error: Pokémon no encontrado" />);
        const mensajeError = screen.getByText('Error: Pokémon no encontrado');
        expect(mensajeError).toBeInTheDocument();
      });
})