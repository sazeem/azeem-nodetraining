const express = require('express');
RoleController = require('../controllers/roleController');
mw = require('../controllers/middleware');

const roleRoutes =() => {
  const roleRoutes = express.Router();
  roleRoutes.get('/roles',RoleController.getRole);
  roleRoutes.post('/roles',RoleController.createRole);
  return roleRoutes;
}

module.exports = roleRoutes;
