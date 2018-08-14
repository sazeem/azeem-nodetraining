const Sequelize = require('sequelize');
const mapper = require('../sequelize');
const projects = require('./projectModel');

const repos = mapper.define('repos', {
  
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true,     
  },
  name:{
    type: Sequelize.STRING,
    allowNull: false,
    unique:true
  },
  owner_id:{
    type: Sequelize.INTEGER, 
    allowNull: false,    
  }
},
  { 
    timestamps: false 
  }
);

module.exports = repos;
