const Sequelize = require("sequelize");
const sequelize = new Sequelize(
 'xyz',
 'root',
 '',
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    sync:true
  }
);
module.exports = sequelize