const mapper = require('../sequelize');
const employees = require('./employeeModel');
const projects = require('./projectModel');
const roles = require('./roleModel');

const works = mapper.define('works', {},
  { 
    timestamps: false 
  }
);

works.belongsTo(projects, {foreignKey: 'project_id', targetKey: 'id', onDelete: 'CASCADE'});
works.belongsTo(employees, {foreignKey: 'employee_id', targetKey: 'id', onDelete: 'CASCADE'});
works.belongsTo(roles, {foreignKey: 'role_id', targetKey: 'id', onDelete: 'CASCADE'});
works.removeAttribute('id');

module.exports = works;
