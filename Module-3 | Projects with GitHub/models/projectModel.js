const Sequelize = require('sequelize');
const Mapper = require('../sequelize');

const Project = Mapper.define('Project', {
  
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

module.exports = Project;
