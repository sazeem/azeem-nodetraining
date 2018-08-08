const Sequelize = require('sequelize');

const sequelize = new Sequelize('employee_management','postgres', 'groot', {
  dialect: 'postgres',
  operatorsAliases: false 
});
sequelize.sync()
 .then(() => console.log("tables created"),(err) => console.log(err));

module.exports = sequelize;
