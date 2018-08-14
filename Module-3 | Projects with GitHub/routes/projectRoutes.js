const express = require('express');
ProjectController = require('../controllers/projectController');

const projectRoutes = () => {
  const projectRoutes = express.Router();
  projectRoutes.get('/projects', ProjectController.projectList);
  projectRoutes.post('/projects', ProjectController.createProject);
  return projectRoutes;
}

module.exports = projectRoutes;
