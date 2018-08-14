const express = require('express');
RepoController = require('../controllers/repoController');

const repoRoutes = () => {
  const repoRoutes = express.Router();
  repoRoutes.get('/projects/:id/:login/repos', RepoController.repoList);
  return repoRoutes;
}

module.exports = repoRoutes;
