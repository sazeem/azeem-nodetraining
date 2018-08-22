const express = require('express');
PullRequestController = require('../controllers/pullRequestController');

const pullRequestRoutes = () => {
  const pullRequestRoutes = express.Router();
  pullRequestRoutes.get('/project/:id/repos/:repoName/pulls', PullRequestController.getPullRequests);
  return pullRequestRoutes;
}

module.exports = pullRequestRoutes;
