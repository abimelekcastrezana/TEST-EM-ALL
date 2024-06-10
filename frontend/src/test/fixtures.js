export const baseURL = `${import.meta.env.VITE_API_BASE_URL}`;

export const pokemonByIdResponse = {
    id: 1,
    name: 'bulbasaur',
    abilities: [],
    sprites: {}   
}

export const pokemonByNameResponse = {
    id: 25,
        name: 'pikachu',
        abilities: [],
        sprites: {}   
}

export const pokemonsInicialesResponse = Array(50).fill({
    id:'string',
    name: 'string',
    abilities: [],
    sprites: {} 
})

export const errorID = 'ID de Pokémon no válido. Debe ser un número entre 1 y 1000.';