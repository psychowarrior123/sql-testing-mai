const { apiconfig } = require("../data/config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  apiconfig.database,
  apiconfig.user,
  apiconfig.password,
  {
    host: apiconfig.host,
    dialect: apiconfig.dialect,
    operatorsAliases: false,

    pool: {
      max: apiconfig.pool.max,
      min: apiconfig.pool.min,
      acquire: apiconfig.pool.acquire,
      idle: apiconfig.pool.idle,
    },
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./User")(sequelize, Sequelize);
db.queries = require("./Query")(sequelize, Sequelize);
db.groups = require("./Group")(sequelize, Sequelize);
db.manipulates = require("./Manipulate")(sequelize, Sequelize);
db.functions = require("./Function")(sequelize, Sequelize);
db.subqueries = require("./Subquery")(sequelize, Sequelize);
db.marks = require("./Mark")(sequelize, Sequelize);

module.exports = db;
