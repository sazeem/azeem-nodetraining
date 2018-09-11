const Project = require('../models/projectModel');
const Repo = require('../models/repoModel')
const ProjectController = {
  
  projectList : (req,res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let totalItems = 0;

    Project.findAll()
    .then(totalProjects => {
      totalItems = totalProjects.length;
      Project.findAll({
        limit: limit,
        offset: (page-1)*(limit)
      }).then(projects => {
        let data = {};
        data.totalItems = totalItems;
        data.items = projects;
        res.send(data);
      })
    });    
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
