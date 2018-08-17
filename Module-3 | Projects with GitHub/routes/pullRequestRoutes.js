const express = require('express');
PullRequestController = require('../controllers/pullRequestController');

const pullRequestRoutes = () => {
  const pullRequestRoutes = express.Router();
  pullRequestRoutes.get('/pulls', PullRequestController.pullRequestList);
  pullRequestRoutes.post('/pulls', PullRequestController.getPullRequestList);
  return pullRequestRoutes;
}

module.exports = pullRequestRoutes;
