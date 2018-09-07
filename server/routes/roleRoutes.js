const express = require('express');
RoleController = require('../controllers/roleController');
mw = require('../controllers/middleware');

const roleRoutes =() => {
  const roleRoutes = express.Router();
  roleRoutes.get('/roles',[mw.middleware], RoleController.getRole);
  roleRoutes.post('/roles', [mw.admin], RoleController.createRole);
  return roleRoutes;
}

module.exports = roleRoutes;
