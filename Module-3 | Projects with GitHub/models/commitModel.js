const Sequelize = require('sequelize');
const mapper = require('../sequelize');
const repos = require('./repoModel');

const commits = mapper.define('commits', {
  
  id: {
    type: Sequelize.STRING, 
    primaryKey: true
  },
  committer:{
    type: Sequelize.STRING,
    allowNull: false
  },
  message:{
    type: Sequelize.STRING,
    allowNull: false
  },
  repo_name:{
    type: Sequelize.STRING,
    allowNull: false
  }
},
  { 
    timestamps: false 
  }
);

module.exports = commits;
