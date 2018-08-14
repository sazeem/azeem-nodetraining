const express = require('express');
CommitController = require('../controllers/commitController');

const commitRoutes = () => {
  const commitRoutes = express.Router();
  commitRoutes.get('/:login/:repo/commits', CommitController.commitList);  
  return commitRoutes;
}

module.exports = commitRoutes;
