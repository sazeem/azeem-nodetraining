const express = require('express');
EmployeeController = require('../controllers/employeeController');

const employeeRoutes = () => {
  const employeeRoutes = express.Router();
  employeeRoutes.get('/employees', EmployeeController.employeeList);
  employeeRoutes.post('/employees', EmployeeController.createEmployee);
  employeeRoutes.get('/employees/:id', EmployeeController.getEmployeeById);
  return employeeRoutes;
}

module.exports = employeeRoutes;
