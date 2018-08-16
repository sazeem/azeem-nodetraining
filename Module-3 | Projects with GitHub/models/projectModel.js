const Sequelize = require('sequelize');
const mapper = require('../sequelize');

const projects = mapper.define('projects', {
  
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true
  },
  name:{
    type: Sequelize.STRING,
    allowNull: false,
    unique:true
  },
  description:{
    type: Sequelize.STRING,
    allowNull: false    
  }  
},
  { 
    timestamps: false 
  }
);

module.exports = projects;
