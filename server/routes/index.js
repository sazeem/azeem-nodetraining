const projectRoutes = require('./projectRoutes');
const employeeRoutes = require('./employeeRoutes');
const roleRoutes = require('./roleRoutes');

const routes = (app) => {
  app.use(`/`, projectRoutes());
  app.use(`/`, employeeRoutes());
  app.use(`/`, roleRoutes());
}

module.exports = routes;
