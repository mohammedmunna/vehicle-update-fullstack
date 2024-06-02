const express = require("express");
const { cors, bodyParser } = require("./middleware/index");
const dbRoutes = require("./routes/dbRoutes");
const vehiclesRoutes = require("./routes/vehiclesRoutes");
const staticRoutes = require("./routes/staticRoutes");
const path = require("path");
require("dotenv").config();

const app = express();

//middleware
app.use(bodyParser);
app.use(cors);
app.use(express.json());

// serves static files to the client
app.use(express.static(path.join(__dirname, "../front-end")));

// routes
app.use(dbRoutes);
app.use(vehiclesRoutes);
app.use(staticRoutes);

module.exports = app;
