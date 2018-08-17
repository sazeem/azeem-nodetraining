const Sequelize = require('sequelize');
const mapper = require('../sequelize');
const repos = require('./repoModel');

const contributors = mapper.define('contributors', {
  
  id:{
    type: Sequelize.INTEGER,
    primaryKey: true
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
contributors.belongsTo(repos, {
  foreignKey: {
    name:'repo_id',
    allowNull: false,
    primaryKey: true
  }, 
  targetKey: 'id',   
  onDelete: 'CASCADE'
});
module.exports = contributors;
