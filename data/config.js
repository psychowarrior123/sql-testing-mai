const mysql = require("mysql");

const apiconfig = {
  host: "us-cdbr-east-04.cleardb.com",
  user: "b79658eacd04ae",
  password: "4c525e4f",
  database: "heroku_1e8fe0c5699d022",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};

const dbconfig = {
  host: "us-cdbr-east-04.cleardb.com",
  user: "bfb3fc03be378c",
  password: "6f00e9c9",
  database: "heroku_9720cba118023c5",
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
