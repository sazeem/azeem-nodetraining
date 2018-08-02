var employees = require('../models/employeeModel');

exports.employeeList = (req,res) => {  
  employees.findAll()
  .then(employees => {
    res.send(employees);
  })
  .catch(() => console.log("error in displaying"));
}

exports.createEmployee = (req,res) => {
  const data = { 
    "EmpID":req.body.EmpID, 
    "EmpName": req.body.EmpName, 
    "Salary":req.body.Salary,
    "ReportingMngrID":req.body.ReportingMngrID 
  }; 
  employees.create({EmpID:data.EmpID, EmpName: data.EmpName, Salary: data.Salary, ReportingMngrID:data.ReportingMngrID})
  .then(() => {
    res.json(" rows created");
  })
}

exports.getEmployeeById = (req,res) => {
  employees.findOne({ where: {EmpID: req.params.id} })
 .then(employees => {
    res.send(employees);
  })
}
