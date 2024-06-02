const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");

const corsOptions = {
  origin: "http://localhost:8000",
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
