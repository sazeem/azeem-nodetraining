const Project = require('../models/projectModel');
const Repo = require('../models/repoModel')
const ProjectController = {
  
  projectList : (req,res) => {
    Project.findAll()
    .then(projects => res.send(projects))
    .catch((err) => res.status(400).send(err.parent.detail));
  },

  getProjectById : (req,res) => {
    const projectId = req.params.id;

    Project.findAll({
      where:{
        id:projectId
      }
    })
    .then((projects) => res.status(200).send(projects))
    .catch((err) => res.status(400).send(err));
  },

  createProject : (req,res) => {
    const data = {
      "name": req.body.name, 
      "description":req.body.description
    };
    Project.create({
      name: data.name, 
      description: data.description
    })
    .then(() => res.status(201).json("New Project Added!"))
    .catch((err) => res.status(400).send(err.parent.detail));
  }
}

module.exports = ProjectController;
