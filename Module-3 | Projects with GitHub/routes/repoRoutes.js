const express = require('express');
const RepoController = require('../controllers/repoController');

const repoRoutes = () => {
  const repoRoutes = express.Router();
  repoRoutes.get('/projects/:id/repos/:repoName', RepoController.getRepoByName);
  repoRoutes.get('/projects/:id/repos', RepoController.getRepos);
  return repoRoutes;
}

module.exports = repoRoutes;
