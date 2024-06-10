import { http, HttpResponse } from 'msw'
import { pokemonByIdResponse, pokemonByNameResponse, pokemonsInicialesResponse } from './fixtures'
import { baseURL } from './fixtures'

export const handlers = [
  http.get(`${baseURL}/iniciales`, () => {
    return HttpResponse.json(pokemonsInicialesResponse)
  }),

  http.get(`${baseURL}/id/1`, () => {
    return HttpResponse.json(pokemonByIdResponse)
  }),

  http.get(`${baseURL}/nombre/pikachu`, () => {
    return HttpResponse.json(pokemonByNameResponse)
  }),
]