const express = require("express");
const path = require("path");

const router = express.Router();

// serve front-end
router.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../front-end/index.html"));
});

module.exports = router;
