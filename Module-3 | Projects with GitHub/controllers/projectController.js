const Project = require('../models/projectModel');

exports.projectList = (req,res) => {
  Project.findAll().then(projects => {
    res.send(projects);
  });
}

exports.createProject = (req,res) => {
  const data = {
    "name": req.body.name, 
    "description":req.body.description
  };
  Project.create({
    name: data.name, 
    description: data.description
  })
   .then(() => {
    res.status(201).json("New Project Added!");
   })
   .catch((err) =>{
    res.status(400).send(err.parent.detail);
   });
}
