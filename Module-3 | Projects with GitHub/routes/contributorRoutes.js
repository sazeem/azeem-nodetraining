const express = require('express');
ContributorController = require('../controllers/contributorController');

const contributorRoutes = () => {
  const contributorRoutes = express.Router();
  contributorRoutes.get('/contributors', ContributorController.contributorList);  
  contributorRoutes.post('/contributors', ContributorController.getContributorList);
  return contributorRoutes;
}

module.exports = contributorRoutes;
