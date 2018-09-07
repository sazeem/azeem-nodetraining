const Sequelize = require('sequelize');
const mapper = require('../sequelize');

const roles = mapper.define('roles', {
  
  id: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique:true
  }
  },
  { 
    timestamps: false 
  }
);

module.exports = roles;
