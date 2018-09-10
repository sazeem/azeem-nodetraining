const express = require('express');
const HeroesController = require('../controllers/heroesController');

const heroesRoutes = () => {
  const heroesRoutes = express.Router();

  heroesRoutes.get('/heroes', HeroesController.getHeroes);
  heroesRoutes.get('/heroes/:id', HeroesController.getHeroesById);
  heroesRoutes.delete('/heroes/:id', HeroesController.deleteHeroes);
  heroesRoutes.post('/heroes', HeroesController.addHeroes);
  heroesRoutes.put('/heroes', HeroesController.updateHeroes);

  return heroesRoutes;
}

module.exports = heroesRoutes
