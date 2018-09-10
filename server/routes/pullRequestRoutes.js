const express = require('express');
const PullRequestController = require('../controllers/pullRequestController');

const pullRequestRoutes = () => {
  const pullRequestRoutes = express.Router();
  pullRequestRoutes.get('/projects/:id/repos/:repoName/pulls', PullRequestController.getPullRequests);
  return pullRequestRoutes;
}

module.exports = pullRequestRoutes;
