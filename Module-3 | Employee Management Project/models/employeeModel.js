const Sequelize = require('sequelize');
const mapper = require('../sequelize')

const employees = mapper.define('employees', {
  
  ID: {

    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },

  EmpName:{
    type: Sequelize.STRING,
    allowNull: false
  },

  Salary: {
    type: Sequelize.INTEGER,
    allowNull: false
  },

  ReportingMngrID:{
    type: Sequelize.INTEGER,
    allowNull: false
  }  
},
  { 
    timestamps: false 
  }
);

module.exports = employees;
