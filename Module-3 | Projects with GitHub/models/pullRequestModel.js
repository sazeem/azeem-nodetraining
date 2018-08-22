const Sequelize = require('sequelize');
const Mapper = require('../sequelize');
const Repo = require('./repoModel');

const PullRequest = Mapper.define('PullRequest', {
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
  user_name: {
    type: Sequelize.STRING   
  },
  repo_name: {
    type: Sequelize.STRING
  }
},
  {
    timestamps: false
  }
);

PullRequest.belongsTo(Repo, {foreignKey: 'repo_id', targetKey: 'id', onDelete: 'CASCADE'});

module.exports = PullRequest;
