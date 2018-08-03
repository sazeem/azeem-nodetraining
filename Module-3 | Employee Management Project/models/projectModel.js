const Sequelize = require('sequelize');
const mapper = require('../sequelize')

const projects = mapper.define('projects', {
  
  ID: {

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

module.exports = projects;
