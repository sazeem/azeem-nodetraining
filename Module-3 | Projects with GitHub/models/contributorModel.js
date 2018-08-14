const Sequelize = require('sequelize');
const mapper = require('../sequelize');
const repos = require('./repoModel');

const contributors = mapper.define('contributors', {
  
  id: {
    type: Sequelize.INTEGER,    
    primaryKey: true
  },
  repo_name:{
  	type: Sequelize.STRING,    
  }
},
  { 
    timestamps: false 
  }
);

module.exports = contributors;
