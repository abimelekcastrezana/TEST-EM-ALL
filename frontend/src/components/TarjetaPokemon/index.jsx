import PropTypes from 'prop-types';
import {
  Box, Card, CardContent, Typography, Divider, CardMedia, CardActions, IconButton, Tooltip,
} from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

function TarjetaPokemon({ pokemon }) {
  const { name, abilities, sprites } = pokemon;

  return (
    <Box>
      <Card sx={{
        borderRadius: 5,
        margin: 'auto',
        borderStyle: 'solid',
        borderWidth: '2px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',

      }}
      >
        <CardContent sx={{
          background: 'linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(40,111,186,1) 50%, rgba(30,69,130,1) 100%)',
        }}
        >
          <Divider>
            <Typography variant="h6" align="center" color="#ffcc02">{name.toUpperCase()}</Typography>
          </Divider>
        </CardContent>
        <CardMedia component="img" image={sprites.front_default} />

        <CardActions disableSpacing>
          <Tooltip title={abilities.map((ability) => ability.ability.name.toUpperCase()).join(', ')}>
            <IconButton aria-label="Ver información">
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </CardActions>
      </Card>
    </Box>
  );
}

TarjetaPokemon.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string.isRequired,
    abilities: PropTypes.arrayOf(
      PropTypes.shape({
        ability: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      }),
    ).isRequired,
    sprites: PropTypes.shape({
      front_default: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,

};

export default TarjetaPokemon;
