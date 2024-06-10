/* eslint-disable no-undef */
import { renderHook, act, waitFor } from '@testing-library/react';
import { http } from 'msw';
import { server } from '../../test/node';
import usePokemonAPI from '../usePokemonApi';
import { pokemonByIdResponse, pokemonByNameResponse, pokemonsInicialesResponse, errorID, baseURL } from '../../test/fixtures';

describe('Pruebas usePokemonAPI', () => {
  it('Deberá cargar pokemones iniciales', async () => {
    const { result } = renderHook(() => usePokemonAPI());
    await waitFor(() => {
      expect(result.current.pokemonList.length).toBe(pokemonsInicialesResponse.length);
    });
  });
  it('Deberá actualizar pokemon seleccionado al buscar por id', async () => {
    const { result } = renderHook(() => usePokemonAPI());

    await act(() => result.current.buscarPokemon('1'));

    expect(result.current.pokemonSeleccionado).toStrictEqual([pokemonByIdResponse]);
  });
  it('Deberá actualizar pokemon seleccionado al buscar por nombre', async () => {
    const { result } = renderHook(() => usePokemonAPI());

    await act(() => result.current.buscarPokemon('pikachu'));

    expect(result.current.pokemonSeleccionado).toStrictEqual([pokemonByNameResponse]);
  });
  it('Deberá loading ser true al solicitar y false al obtener respuesta de pokemones iniciales', async () => {
    const { result } = renderHook(() => usePokemonAPI());

    expect(result.current.loading).toBeTruthy();
    await waitFor(() => {
      expect(result.current.loading).toBeFalsy();
    });
  });
  it('Deberá actualizar pokemon seleccionado al buscar por id', async () => {
    const { result } = renderHook(() => usePokemonAPI());

    await act(() => result.current.buscarPokemon('1001'));

    expect(result.current.errorMessage).toStrictEqual(errorID);
  });
  it('Deberá dar error por pokemon seleccionado con nombre invalido', async () => {
    server.use(
      http.get(`${baseURL}/nombre/*`, (req, res, ctx) => {
        return res(
          ctx.status(404),
          ctx.json({ errorMessage: 'No se pudo obtener el Pokémon. Por favor, inténtalo de nuevo.' }),
        );
      }),
    )

    const { result } = renderHook(() => usePokemonAPI());
    await act(() => result.current.buscarPokemon('inventadoPikachu'));

    expect(result.current.errorMessage).toBeTruthy();
    expect(result.current.errorMessage).toBe('No se pudo obtener el Pokémon. Por favor, inténtalo de nuevo.');
  });
  it('Deberá dar error por pokemon seleccionado con nombre invalido', async () => {
    server.use(
      http.get(`${baseURL}/nombre/*`, (req, res, ctx) => {
        return res(
          ctx.status(400),
          ctx.json({ errorMessage: 'Nombre de Pokémon no válido. Solo se permiten letras, números y guiones.' }),
        );
      }),
    )

    const { result } = renderHook(() => usePokemonAPI());
    await act(() => result.current.buscarPokemon('noValido_Pikachu'));

    expect(result.current.errorMessage).toBeTruthy();
    expect(result.current.errorMessage).toBe('Nombre de Pokémon no válido. Solo se permiten letras, números y guiones.');
  });
});