const Sequelize = require('sequelize');
const mapper = require('../sequelize');
const repos = require('./repoModel');

const commits = mapper.define('commits', {
  
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  committer:{
    type: Sequelize.STRING,
    allowNull: false,
    unique:true
  },
  message:{
    type: Sequelize.STRING,
    allowNull: false,
    unique:true
  }  
},
  { 
    timestamps: false 
  }
);

commits.belongsTo(repos, {foreignKey: 'repo_id', targetKey: 'id', onDelete: 'CASCADE'});

module.exports = commits;
