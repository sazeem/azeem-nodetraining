const projects = require('../models/projectModel');
const employees = require('../models/employeeModel');
const roles = require('../models/roleModel');
const works = require('../models/workModel');
const Sequelize = require('sequelize');

exports.projectList = (req,res) => {
  projects.findAll().then(projects => {
    res.send(projects);
  })
}

exports.assignEmpToProject = (req,res) => {
  
  const project_id = req.params.id;
  const data = {
    "employee_id": req.body.employee_id,
    "role_id"    : req.body.role_id
  };
  works.create({
    project_id   : project_id,
    employee_id  : data.employee_id, 
    role_id      : data.role_id
  })
   .then(() => {
    res.status(201).send("Employee and Role added to the Project!");
   })
   .catch((err) =>{
    res.status(400).send(err.parent.detail);
   });
}

exports.getProjectById = (req,res) => {  
 works.findAll({
    attributes:["project_id"],
    where:{ project_id: req.params.id},
    include:[{
      model:projects,
      attributes:["name"]
    },
    {
      model:employees,
      attributes:["name","salary"]
    },
    {
      model:roles,
      attributes:["name"]
    }
    ]
  })
  .then(works => {
    if(works.length == {})
      res.status(400).send("Project with given ID isn't mature yet!");
    res.send(works);
  })
  .catch((err) =>{
    res.status(400).send("Project with given ID isn't mature yet!");
  });  
}

exports.createProject = (req,res) => {
  const data = { 
    "name"        : req.body.name, 
    "manager_id"  : req.body.manager_id, 
    "duration"    : req.body.duration,
    "cost"        : req.body.cost 
  }; 
  projects.create({
    name      : data.name, 
    manager_id: data.manager_id, 
    duration  : data.duration, 
    cost      : data.cost
  })
  .then(() => {
    res.status(201).json("New Project Added!");
  })
  .catch((err) =>{
    res.status(400).send(err.parent.detail);
  });
}
