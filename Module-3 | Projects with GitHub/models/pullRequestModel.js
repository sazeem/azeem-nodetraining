const Sequelize = require('sequelize');
const mapper = require('../sequelize');
const repos = require('./repoModel');

const pull_requests = mapper.define('pull_requests', {
  
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  number: {
    type: Sequelize.INTEGER    
  },
  user_id: {
    type: Sequelize.INTEGER    
  },
  repo_name: {
    type: Sequelize.STRING    
  }
  
},
  {
    timestamps: false 
  }
);

module.exports = pull_requests;
