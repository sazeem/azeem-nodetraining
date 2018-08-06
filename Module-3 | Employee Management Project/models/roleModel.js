const Sequelize = require('sequelize');
const mapper = require('../sequelize');

const roles = mapper.define('roles', {
  
  ID: {

    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  RoleName: {
    type: Sequelize.STRING,
    allowNull: false
  }
  },
  { 
    timestamps: false 
  }
);

module.exports = roles;
