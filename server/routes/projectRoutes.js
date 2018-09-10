const express = require('express');
ProjectController = require('../controllers/projectController');

const projectRoutes = () => {
  const projectRoutes = express.Router();
  projectRoutes.get('/projects', ProjectController.projectList);
  projectRoutes.post('/projects', ProjectController.createProject);
  projectRoutes.get('/projects/:id', [mw.middleware], ProjectController.getProjectById);
  projectRoutes.post('/projects/:id', [mw.admin], ProjectController.assignEmpToProject);
  return projectRoutes;
}

module.exports = projectRoutes;
