const Sequelize = require('sequelize');
const sequelize = new Sequelize('projects_github','postgres', 'groot', {
  dialect: 'postgres',
  operatorsAliases: false 
});
sequelize.sync()
 .then(() => console.log("Tables Updated!"),(err) => console.log(err));

module.exports = sequelize;
