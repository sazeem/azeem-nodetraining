const Sequelize = require('sequelize');
const mapper = require('../sequelize');
const repos = require('./repoModel');

const contributors = mapper.define('contributors', {
  
  id: {
    type: Sequelize.INTEGER,
    autoIncrement:true,
    primaryKey: true
  },
  user_id:{
    type: Sequelize.INTEGER
  },
  name:{
    type: Sequelize.STRING,    
  },
  repo_name:{
    type: Sequelize.STRING,    
  }
},
  { 
    timestamps: false 
  }
);
contributors.belongsTo(repos, {foreignKey: 'repo_id', targetKey: 'id', onDelete: 'CASCADE'});
module.exports = contributors;
