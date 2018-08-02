const express = require('express');
RoleController = require('../controllers/roleController');

const roleRoutes =() => {
  const roleRoutes = express.Router();
  roleRoutes.post('/role', RoleController.createRole);
  roleRoutes.get('/role', RoleController.getRole);
  return roleRoutes;
}

module.exports = roleRoutes;
