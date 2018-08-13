const contributors = require('../models/contributorModel');
const Sequelize = require('sequelize');

exports.contributorList = (req,res) => {
  
  contributors.findAll().then(contributors => {
    res.send(contributors);
  });
  
}

