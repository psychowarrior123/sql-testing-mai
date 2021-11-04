const mysql = require("mysql");

const apiconfig = {
  host: "localhost",
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
  host: "localhost",
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
