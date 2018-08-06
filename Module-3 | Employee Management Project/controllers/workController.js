const works = require('../models/workModel');
const Sequelize = require('sequelize');

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