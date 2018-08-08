const express = require('express');
EmployeeController = require('../controllers/employeeController');
mw = require('../controllers/middleware');

const employeeRoutes = () => {
  const employeeRoutes = express.Router();
  employeeRoutes.get('/employees', [mw.middleware], EmployeeController.employeeList);
  employeeRoutes.post('/employees', [mw.admin], EmployeeController.createEmployee);
  employeeRoutes.get('/employees/:id', [mw.admin], EmployeeController.getEmployeeById);
  return employeeRoutes;
}

module.exports = employeeRoutes;
