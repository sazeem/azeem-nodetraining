const commits = require('../models/commitModel');
const Sequelize = require('sequelize');

exports.commitList = (req,res) => {
  
  commits.findAll().then(commits => {
    res.send(commits);
  });
  
}

