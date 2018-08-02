const Projects = require('../models/projectModel');
const Work = require('../models/workModel');
const Sequelize = require('sequelize');

exports.projectList = (req,res) => {
  Projects.findAll().then(projects => {
    res.send(projects);
  })
}

exports.assignProjectToEmp = (req,res) => {
  let {ProjectID,EmpID} = req.params;
  let { RoleID }= req.body;
  Work.create({
    ProjectID: id,
    EmpID: EmpID, 
    RoleID: RoleID
  })
  .then(() => {
    res.send("new mapping created")
  })
  .catch(()=>{
    res.send("error while inserting your data")
  })
}

exports.getProjectById = (req,res) => {
  Work.findAll({
    attributes:['ProjectID','EmpID'],
    where:{ ProjectID: req.params.id},
    include:[ {all:true}]
  })
  .then(workModel => {
    res.send(workModel);
  })
}

exports.createProject = (req,res) => {
  let {ProjectID,ProjectName,ManagerID, Duration, Cost} = req.body;
  Projects.create({ProjectID:ProjectID, ProjectName:ProjectName, ManagerID:ManagerID, Duration:Duration, Cost:Cost})
  .then(() => {
    res.send("added new row");
  })
  .catch(()=> {
    res.send("error while inserting data  in project")
  })
}
