const Sequelize = require('sequelize');
const mapper = require('../sequelize');
const repos = require('./repoModel');

const contributors = mapper.define('contributors', {
  
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  }
},
  { 
    timestamps: false 
  }
);

contributors.belongsTo(repos, {foreignKey: 'repo_id', targetKey: 'id', onDelete: 'CASCADE'});

module.exports = contributors;
