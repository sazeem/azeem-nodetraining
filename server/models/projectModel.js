const Sequelize = require('sequelize');
const mapper = require('../sequelize');
const employees = require('./employeeModel');

const projects = mapper.define('projects', {
  
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
  },

  name:{
    type: Sequelize.STRING,
    allowNull: false,
    unique:true
  },

  duration: Sequelize.INTEGER,

  cost: Sequelize.INTEGER

  },
  { 
    timestamps: false 
  }
);

projects.belongsTo(employees, {foreignKey: 'manager_id', targetKey: 'id', onDelete: 'CASCADE'});

module.exports = projects;
