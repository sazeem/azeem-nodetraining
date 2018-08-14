const projects = require('../models/projectModel');
const Sequelize = require('sequelize');

exports.projectList = (req,res) => {

  projects.findAll().then(projects => {
    res.send(projects);
  });

}


