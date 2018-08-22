const Sequelize = require('sequelize');
const Mapper = require('../sequelize');
const Project = require('./projectModel');

const Repo = Mapper.define('Repo', {
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true
  },
  name:{
    type: Sequelize.STRING,
    allowNull: false,
    unique:true
  },
  owner_id:{
    type: Sequelize.INTEGER, 
    allowNull: false    
  },
  owner_name:{
    type: Sequelize.STRING, 
    allowNull: false   
  }
},
  { 
    timestamps: false 
  }
);
Repo.belongsTo(Project,{foreignKey: 'project_id', targetKey: 'id', onDelete: 'CASCADE'});

module.exports = Repo;
