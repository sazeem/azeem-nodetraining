const express = require('express');
ProjectController = require('../controllers/projectController');

const projectRoutes = () => {
  const projectRoutes = express.Router();
  projectRoutes.get('/projects', [mw.middleware], ProjectController.projectList);
  projectRoutes.post('/projects', [mw.admin], ProjectController.createProject);
  projectRoutes.get('/projects/:id', [mw.middleware], ProjectController.getProjectById);
  projectRoutes.post('/projects/:id', [mw.admin], ProjectController.assignEmpToProject);
  return projectRoutes;
}

module.exports = projectRoutes;
