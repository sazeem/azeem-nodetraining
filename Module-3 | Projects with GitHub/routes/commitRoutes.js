const express = require('express');
CommitController = require('../controllers/commitController');

const commitRoutes = () => {
  const commitRoutes = express.Router();
  commitRoutes.post('/commits', CommitController.getCommitList);
  commitRoutes.get('/commits', CommitController.commitList);
  return commitRoutes;
}

module.exports = commitRoutes;
