const Sequelize = require('sequelize');
const Mapper = require('../sequelize');
const Repo = require('./repoModel');

const Commit = Mapper.define('Commit', {  
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

Commit.belongsTo(Repo, {foreignKey: 'repo_id', targetKey: 'id', onDelete: 'CASCADE'});

module.exports = Commit;
