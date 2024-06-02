const express = require("express");
const db = require("../config/db");
const { logError } = require("../utils/logger");
const { upload } = require("../middleware");

const router = express.Router();

// limit for query
const LIMIT_VALUE = 50;

// post JSON file
router.post("/upload-file", upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: "No file uploaded" });
  }
  const fileBuffer = req.file.buffer;
  const fileContent = fileBuffer.toString("utf8");
  try {
    const jsonData = JSON.parse(fileContent);
    for (const vehicle of jsonData) {
      const {
        model_year,
        make,
        model,
        rejection_percentage,
        reason_1,
        reason_2,
        reason_3,
      } = vehicle;

      await db.execute(
        `INSERT INTO vehicles (model_year, make, model, rejection_percentage, reason_1, reason_2, reason_3) 
                   VALUES (?, ?, ?, ?, ?, ?, ?)
                   ON DUPLICATE KEY UPDATE
                   rejection_percentage = VALUES(rejection_percentage),
                   reason_1 = VALUES(reason_1),
                   reason_2 = VALUES(reason_2),
                   reason_3 = VALUES(reason_3)`,
        [
          model_year,
          make,
          model,
          rejection_percentage,
          reason_1,
          reason_2,
          reason_3,
        ]
      );
    }

    // get the first 50 vehicles
    const [rows] = await db.execute(
      `SELECT * FROM vehicles LIMIT ${LIMIT_VALUE}`
    );
    res.status(200).send(rows);
  } catch (error) {
    logError(`File upload failed`, error);
    res.status(500).send({ message: "File upload failed", error });
  }
});

// helper function to fetch vehicles
const fetchVehicles = async (query) => {
  if (query) {
    const searchQuery = `%${query}%`;
    return db.execute(
      `SELECT * FROM vehicles 
         WHERE CONCAT_WS(' ', make, model) LIKE ? 
         LIMIT ${LIMIT_VALUE}`,
      [searchQuery]
    );
  } else {
    return db.execute(
      `SELECT * FROM vehicles 
         LIMIT ${LIMIT_VALUE}`
    );
  }
};

// get vehicles
router.get("/vehicles", async (req, res) => {
  const query = req.query.q;
  try {
    const [rows] = await fetchVehicles(query);
    res.status(200).send(rows);
  } catch (error) {
    logError(`Failed to get vehicles`, error);
    res.status(500).send({ message: "Failed to get vehicles", error });
  }
});

module.exports = router;
