const express = require('express');
PullRequestController = require('../controllers/pullRequestController');

const pullRequestRoutes = () => {
  const pullRequestRoutes = express.Router();
  pullRequestRoutes.get('/:login/:repo/pulls', PullRequestController.pullRequestList);
  return pullRequestRoutes;
}

module.exports = pullRequestRoutes;
