const Sequelize = require('sequelize');
const Mapper = require('../sequelize');
const Repo = require('./repoModel');

const Contributor = Mapper.define('Contributor', {
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
Contributor.belongsTo(Repo, {
  foreignKey: {
    name:'repo_id',
    allowNull: false,
    primaryKey: true
  }, 
  targetKey: 'id',   
  onDelete: 'CASCADE'
});

module.exports = Contributor;
