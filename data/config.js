const mysql = require("mysql");

const apiconfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "api",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const dbconfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "db",
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
