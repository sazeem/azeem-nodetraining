const express = require('express');
const ContributorController = require('../controllers/contributorController');

const contributorRoutes = () => {
  const contributorRoutes = express.Router();
  contributorRoutes.get('/projects/:id/repos/:repoName/contributors', ContributorController.getContributors);
  return contributorRoutes;
}

module.exports = contributorRoutes;
