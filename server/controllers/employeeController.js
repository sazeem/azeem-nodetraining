const employees = require('../models/employeeModel');
const _ = require('lodash');

const EmployeeController = {

  employeeList : (req,res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let totalItems = 0;
    
    employees.findAll()
    .then(totalEmployees => {
      totalItems = totalEmployees.length;
      employees.findAll({
        limit: limit,
        offset: (page-1)*(limit)
      })
      .then(employees => {
        let data ={};
        data.totalItems = totalItems;
        data.items = employees;
        res.send(data);
      })
      .catch(() => console.log("Error"));
    });
  },
  createEmployee : (req,res) => {
    const data = {
      "id":req.body.id,
      "name": req.body.name, 
      "salary":req.body.salary,
      "reporting_manager_id":req.body.reporting_manager_id
    }; 
    employees.create({
      id:data.id,
      name: data.name,
      salary: data.salary,
      reporting_manager_id:data.reporting_manager_id
    })
     .then(() => {
      res.status(201).send(req.body);
     })
     .catch((err) =>{
      res.status(400).send(err.parent.detail);
     });  
  },
  getEmployeeById : (req,res) => {
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
}

module.exports = EmployeeController;
