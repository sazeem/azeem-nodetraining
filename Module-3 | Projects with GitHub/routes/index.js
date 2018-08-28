const bodyParser = require('body-parser');
const projectRoutes = require('./projectRoutes');
const repoRoutes = require('./repoRoutes');
const commitRoutes = require('./commitRoutes');
const contributorRoutes = require('./contributorRoutes');
const pullRequestRoutes = require('./pullRequestRoutes');

const routes = (app) => {
  app.use(`/`, projectRoutes());
  app.use(`/`, repoRoutes());
  app.use(`/`, commitRoutes());
  app.use(`/`, contributorRoutes());
  app.use(`/`, pullRequestRoutes());
	app.use(bodyParser.urlencoded({ 
		extended: true 
	}));
	app.use(bodyParser.json());
}

module.exports = routes;
