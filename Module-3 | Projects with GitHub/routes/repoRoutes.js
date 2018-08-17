const express = require('express');
RepoController = require('../controllers/repoController');

const repoRoutes = () => {
  const repoRoutes = express.Router();
  repoRoutes.post('/projects/:id/repos', RepoController.getRepoList);
  repoRoutes.get('/repos', RepoController.repoList);
  return repoRoutes;
}

module.exports = repoRoutes;
