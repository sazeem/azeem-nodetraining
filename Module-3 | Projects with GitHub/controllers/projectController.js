const projects = require('../models/projectModel');
const Sequelize = require('sequelize');

exports.projectList = (req,res) => {
  projects.findAll().then(projects => {
    res.send(projects);
  });
}

exports.createProject = (req,res) => {
  const data = {     
    "name": req.body.name, 
    "description":req.body.description,
  }; 
  projects.create({
    name: data.name, 
    description: data.description, 
  })
   .then(() => {
    res.status(201).json("New Projects Added!");
   })
   .catch((err) =>{
    res.status(400).send(err.parent.detail);
   });
}
