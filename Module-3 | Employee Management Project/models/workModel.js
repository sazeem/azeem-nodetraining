const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
var Employees = require('./employeeModel');
var Projects = require('./projectModel');
var Roles = require('./roleModel');

const Work = sequelize.define('works', {
  
  WorkID: {
    type: Sequelize.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  }
},
  { 
    timestamps: false 
  }
);

Work.belongsTo(Projects, { foreignKey: { primaryKey: true }, onDelete: 'CASCADE' });
Work.belongsTo(Employees, { foreignKey: { primaryKey: true }, onDelete: 'CASCADE' });
Work.belongsTo(Roles, { foreignKey: { primaryKey: true }, onDelete: 'CASCADE' });

module.exports = Work;
