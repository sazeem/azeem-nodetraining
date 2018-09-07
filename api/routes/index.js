const heroesRoutes = require('./heroesRoutes');

const routes = (app) => {
  app.use(`/`, heroesRoutes());  
}

module.exports = routes;
