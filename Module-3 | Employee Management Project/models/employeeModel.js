const Sequelize = require('sequelize');
const sequelize = require('../sequelize')

const Employees = sequelize.define('employees', {
  
  EmpID: {

    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },

  EmpName:{
    type: Sequelize.STRING,
    allowNull: false
  },

  Salary: Sequelize.INTEGER,

  ReportingMngrID: Sequelize.INTEGER
  
  },
  { 
    timestamps: false 
  }
);

module.exports = Employees;
