const express = require("express");
const db = require("../config/db");
const { logInfo, logError } = require("../utils/logger");
require("dotenv").config();

const router = express.Router();

const dbName = process.env.DB_NAME;

// create Database
router.get("/create-db", async (req, res) => {
  try {
    const createDbQuery = `CREATE DATABASE IF NOT EXISTS ${dbName}`;
    const [result] = await db.query(createDbQuery);
    logInfo(`Database ${dbName} created`, result);
    res.status(200).json({
      message: `Database ${dbName} created successfully`,
      result: result,
    });
  } catch (error) {
    logError(`Error creating database`, error);
    res.status(500).json({
      message: `Error creating database`,
      error: error.message,
    });
  }
});

// create Table
router.get("/create-vehicles-table", async (req, res) => {
  const dropTableQuery = `DROP TABLE IF EXISTS vehicles;`;
  const createTableQuery = `CREATE TABLE vehicles (
          id INT UNSIGNED AUTO_INCREMENT NOT NULL PRIMARY KEY,
          model_year VARCHAR(4),
          make VARCHAR(50),
          model VARCHAR(50),
          rejection_percentage VARCHAR(10),
          reason_1 VARCHAR(255),
          reason_2 VARCHAR(255),
          reason_3 VARCHAR(255),
          UNIQUE (model_year, make, model)
        );`;

  try {
    await db.execute(dropTableQuery);
    const [result] = await db.query(createTableQuery);
    logInfo(`Table 'vehicles' created`, result);
    res.status(200).json({
      message: "Table 'vehicles' created successfully",
      result: result,
    });
  } catch (error) {
    logError(`Error creating table`, error);
    res.status(500).json({
      message: `Error creating table`,
      error: error.message,
    });
  }
});

module.exports = router;
