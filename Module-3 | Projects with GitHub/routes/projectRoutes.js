const express = require('express');
const ProjectController = require('../controllers/projectController');

const projectRoutes = () => {
  const projectRoutes = express.Router();
  projectRoutes.get('/projects', ProjectController.projectList);
  projectRoutes.get('/projects/:id', ProjectController.getProjectById);
  projectRoutes.post('/projects', ProjectController.createProject);

  return projectRoutes;
}

module.exports = projectRoutes;
