require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/cors");
const bodyParser = require("body-parser");

const badRoute = require("./middleware/badroute");
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", require("./routes/api"));
app.use(badRoute);
module.exports = app;
