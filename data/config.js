const mysql = require("mysql");

const apiconfig = {
  host: "server231.hosting.reg.ru",
  user: "u1518696_default",
  password: "K88JBC3M4ZvmdXt9",
  database: "u1518696_api",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const dbconfig = {
  host: "server231.hosting.reg.ru",
  user: "u1518696_default",
  password: "K88JBC3M4ZvmdXt9",
  database: "u1518696_db",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const pool = mysql.createPool(dbconfig);

module.exports = { pool, dbconfig, apiconfig };
