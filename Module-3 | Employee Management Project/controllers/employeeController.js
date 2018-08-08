const employees = require('../models/employeeModel');
const _ = require('lodash');

exports.employeeList = (req,res) => {

  employees.findAll()
   .then(employees => {  
    res.send(employees);
   })
   .catch(() => console.log("Error"));
}

exports.createEmployee = (req,res) => {
  const data = {     
    "name": req.body.name, 
    "salary":req.body.salary,
    "reporting_manager_id":req.body.reporting_manager_id 
  }; 
  employees.create({
    name: data.name, 
    salary: data.salary, 
    reporting_manager_id:data.reporting_manager_id
  })
   .then(() => {
    res.status(201).json("New Employee Added!");
   })
   .catch((err) =>{
    res.status(400).send(err.parent.detail);
   });
}

exports.getEmployeeById = (req,res) => {
  employees.findById(req.params.id)
   .then(employees => {
    if(employees.length == {})
      res.status(400).send("Employee with given ID doesn't exist!");
    res.send(employees);
   })
   .catch((err) =>{
    res.status(400).send("Employee with given ID doesn't exist!");
   });
}
