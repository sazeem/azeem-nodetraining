const mapper = require('../sequelize');
const employees = require('./employeeModel');
const projects = require('./projectModel');
const roles = require('./roleModel');

const works = mapper.define('works', {},
  { 
    timestamps: false 
  }
);

works.belongsTo(projects, { foreignKey: { primaryKey: true }, onDelete: 'CASCADE' });
works.belongsTo(employees, { foreignKey: { primaryKey: true }, onDelete: 'CASCADE' });
works.belongsTo(roles, { foreignKey: { primaryKey: true }, onDelete: 'CASCADE' });
works.removeAttribute('id');

module.exports = works;
