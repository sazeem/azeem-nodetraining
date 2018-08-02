const Sequelize = require('sequelize');
const sequelize = require('../sequelize')

const Roles = sequelize.define('roles', {
  
  RoleID: {

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

module.exports = Roles;
