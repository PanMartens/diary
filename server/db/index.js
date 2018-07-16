const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  
});

sequelize.authenticate().then(() => {
  console.log("Success!");
}).catch((err) => {
  console.log(err);
});

module.exports = sequelize;
