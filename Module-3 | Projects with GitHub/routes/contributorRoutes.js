const express = require('express');
ContributorController = require('../controllers/contributorController');

const contributorRoutes = () => {
  const contributorRoutes = express.Router();
  contributorRoutes.get('/:login/:repo/contributors', ContributorController.contributorList);  
  return contributorRoutes;
}

module.exports = contributorRoutes;
