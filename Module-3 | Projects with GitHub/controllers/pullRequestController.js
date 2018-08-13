const pullRequests = require('../models/pullRequestModel');
const Sequelize = require('sequelize');

exports.pullRequestList = (req,res) => {
  
  pullRequests.findAll().then(pullRequests => {
    res.send(pullRequests);
  });
  
}

