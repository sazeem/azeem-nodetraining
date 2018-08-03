const express = require('express');
WorkController = require('../controllers/workController');

const workRoutes = () => {
  const workRoutes = express.Router();
  workRoutes.post('/works/:id', WorkController.assignEmpToProject);
  return workRoutes;
}

module.exports = workRoutes;
