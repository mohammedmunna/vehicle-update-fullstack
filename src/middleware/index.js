const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
require("dotenv").config();

const corsOptions = {
  origin: process.env.APPLICATION_URL,
  optionsSuccessStatus: 200,
};

const upload = multer({
  limits: {
    fileSize: 1000000, // limit 1 MB file size
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(json)$/)) {
      // reject file
      return cb(new Error("Please upload JSON file"));
    }
    // accept file
    cb(null, true);
  },
});

module.exports = {
  cors: cors(corsOptions),
  bodyParser: bodyParser.json(),
  upload,
};
