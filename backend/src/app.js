const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });
const pokemonRouter = require('./pokemon.router');


const app = express();
const PORT = process.env.PORT || 5001;
app.use(cors());

app.use('/pokemon', pokemonRouter);

app.get('/', (req, res) => {
  res.send('¡Bienvenido a la PokéAPI!');
});

app.listen(PORT, () => {
  console.log(`Servidor Express corriendo en el puerto ${PORT}`);
});

module.exports = app;
