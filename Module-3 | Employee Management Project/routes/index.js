const projectRoutes = require('./projectRoutes');
const employeeRoutes = require('./employeeRoutes');
const roleRoutes = require('./roleRoutes');
const workRoutes = require('./workRoutes');

const routes = (app) => {
  app.use(`/`, projectRoutes());
  app.use(`/`, employeeRoutes());
  app.use(`/`, roleRoutes());
  app.use(`/`, workRoutes());
}

module.exports = routes;
