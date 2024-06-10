import { describe, test, beforeAll, expect, afterAll } from "vitest";

const app = require ('../app');

const request = require('supertest');

let server;
let api;

beforeAll(() => {
  server = app.listen(5001, () => {
    console.log('Servidor Express iniciado en el puerto 5001'); 
  }); 
  api = request(app);
});

afterAll(() => {
  server.close(() => {
    console.log('Servidor Express detenido');
  }); 
});

describe('Purebas a pokemon.router', () => {
  test('Verificar si el servidor está funcionando', async () => {
    try {
      const response = await api.get('/');
      expect(response.status).toBe(200);
      expect(response.text).toContain('¡Bienvenido a la PokéAPI!');
    } catch (error) {
      throw new Error(`Error al verificar mensaje de bienvenida: ${error.message}`);
    }
  });

  describe('GET /nombre', () => {
    test('Debería retornar nombre, habilidades y sprite_default del pokemon', async () => {
      const nombrePokemon = 'bulbasaur';
      const pokeResponse = {
        id: expect.any(Number),
        name: expect.any(String),
        abilities: expect.any(Array),
        sprites: {
          back_default: expect.stringMatching(/^https?:\/\/\S+$/)
        }
      };
    
      const response = await request(app).get(`/pokemon/nombre/${nombrePokemon}`);
    
      expect(response.status).toBe(200);
      expect(response.body).toMatchObject(pokeResponse);
    });
    test('Debe devolver un error 400 con el mensaje adecuado para un pokemon no valido', async () => {
      const nombrePokemon = 'novalid_pikachu';
      const nombreNoValido = { error: 'Nombre de Pokémon no válido' };

      const response = await request(app).get(`/pokemon/nombre/${nombrePokemon}`);
    
      expect(response.status).toBe(400);
      expect(response.body).toEqual(nombreNoValido);
    });
    test('Debe devolver un error 404 con el mensaje adecuado para un pokemon no encontrado', async () => {
      const nombrePokemon = 'inventadoPikachu';
      const noEncontrado = { error: 'No se encontró el Pokémon.' };

      const response = await request(app).get(`/pokemon/nombre/${nombrePokemon}`);
    
      expect(response.status).toBe(404);
      expect(response.body).toEqual(noEncontrado);
    });
  })

  describe('GET /id', () => {
    test('Debería retornar nombre, habilidades y sprite_default del pokemon %s', async () => {
      const idPokemon = '151';
      const pokeResponse = {
        id: expect.any(Number),
        name: expect.any(String),
        abilities: expect.any(Array),
        sprites: {
          front_default: expect.stringMatching(/^https?:\/\/\S+$/)
        }
      };
    
      const response = await request(app).get(`/pokemon/id/${idPokemon}`);
    
      expect(response.status).toBe(200);
      expect(response.body.id).toBeLessThan(1001)
      expect(response.body).toMatchObject(pokeResponse);
    });
    test('Debe devolver un error 400 con el mensaje adecuado para un id no valido', async () => {
      const idPokemon = '1001';
      const idNoValido = { error: 'ID de Pokémon no válido' };

      const response = await request(app).get(`/pokemon/id/${idPokemon}`);
    
      expect(response.status).toBe(400);
      expect(response.body).toEqual(idNoValido);
    });
  })

  describe('GET /iniciales', () => {
    test('Debería retornar una lista con 50 pokemon y sus propiedades', async () => {
      const pokeResponse = {
        id: expect.any(Number),
        name: expect.any(String),
        abilities: expect.arrayContaining([
          expect.objectContaining({
            ability: expect.objectContaining({
              name: expect.any(String),
              url: expect.stringMatching(/^https?:\/\/\S+$/)
            }),
          })
        ]),
        sprites: expect.objectContaining({
          back_default: expect.stringMatching(/^https?:\/\/\S+$/),
          front_default: expect.stringMatching(/^https?:\/\/\S+$/)
        })
      };
    
      const response = await request(app).get('/pokemon/iniciales');
    
      expect(response.status).toBe(200);
      expect(response.body).toHaveLength(50);
      response.body.forEach(pokemon => {
        expect(pokemon).toMatchObject(pokeResponse);
      });
    }, 10000);  
  })
})
