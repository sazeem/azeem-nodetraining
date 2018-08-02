const Sequelize = require('sequelize');
const sequelize = require('../sequelize')

const Projects = sequelize.define('projects', {
  
  ProjectID: {

    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },

  ProjectName:{
    type: Sequelize.STRING,
    allowNull: false
  },

  ManagerID: Sequelize.INTEGER,

  Duration: Sequelize.INTEGER,

  Cost: Sequelize.INTEGER

  },
  { 
    timestamps: false 
  }
);

module.exports = Projects;
