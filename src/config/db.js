const mysql = require("mysql2");
require("dotenv").config();

// create MYSQL DB connection
const db = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.DB_NAME,
  })
  .promise();

module.exports = db;
