const Sequelize = require('sequelize');
const mapper = require('../sequelize')

const employees = mapper.define('employees', {
  
  id: {

    type: Sequelize.INTEGER, 
    primaryKey: true, 
  },

  name:{
    type: Sequelize.STRING,
    allowNull: false,
    unique:true
  },

  salary: {
    type: Sequelize.INTEGER,
    allowNull: false
  }

},
  { 
    timestamps: false 
  }
);
employees.belongsTo(employees, {foreignKey: 'reporting_manager_id', targetKey: 'id', onDelete: 'CASCADE'});

module.exports = employees;
