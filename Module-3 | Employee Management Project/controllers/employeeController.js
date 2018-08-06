var employees = require('../models/employeeModel');

exports.employeeList = (req,res) => {  
  employees.findAll()
   .then(employees => {
     res.send(employees);
   })
   .catch(() => console.log("Error"));
}

exports.createEmployee = (req,res) => {
  const data = {     
    "EmpName": req.body.EmpName, 
    "Salary":req.body.Salary,
    "ReportingMngrID":req.body.ReportingMngrID 
  }; 
  employees.create({
    EmpName: data.EmpName, 
    Salary: data.Salary, 
    ReportingMngrID:data.ReportingMngrID
  })
  .then(() => {
    res.json("New Employee Added!");
  });
}

exports.getEmployeeById = (req,res) => {
  employees.findOne({ where: {ID: req.params.id} })
   .then(employees => {
     res.send(employees);
   })   
}
