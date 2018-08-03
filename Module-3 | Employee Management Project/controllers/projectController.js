const projects = require('../models/projectModel');
const works = require('../models/workModel');
const Sequelize = require('sequelize');

exports.projectList = (req,res) => {
  projects.findAll().then(projects => {
    res.send(projects);
  })
}

exports.assignEmpToProject = (req,res) => {
  
  const ID = req.params.id;  
  const data = { 
    "ProjectID":req.body.ProjectID, 
    "RoleID": req.body.RoleID     
  };
  works.create({
    projectID: data.ProjectID,
    employeeID: ID, 
    roleID: data.RoleID
  })
  .then(() => {
    res.send("Created New Mapping!")
  })  
}

exports.getProjectById = (req,res) => {  
 works.findAll({
    attributes:['projectID','employeeID'],
    where:{ projectID: req.params.id},
    include:[ {all:true}]
  })
  .then(works => {
    res.send(works);
  })  
}

exports.createProject = (req,res) => {
  const data = { 
    "ProjectName":req.body.ProjectName, 
    "ManagerID": req.body.ManagerID, 
    "Duration":req.body.Duration,
    "Cost":req.body.Cost 
  }; 
  projects.create({
    ProjectName:data.ProjectName, 
    ManagerID:data.ManagerID, 
    Duration:data.Duration, 
    Cost:data.Cost
  })
  .then(() => {
    res.json("New Project Added!");
  });
}
