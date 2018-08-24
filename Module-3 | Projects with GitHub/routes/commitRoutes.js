const express = require('express');
const CommitController = require('../controllers/commitController');

const commitRoutes = () => {
  const commitRoutes = express.Router();
  commitRoutes.get('/projects/:id/repos/:repoName/commits', CommitController.getCommits);
  return commitRoutes;
}

module.exports = commitRoutes;
