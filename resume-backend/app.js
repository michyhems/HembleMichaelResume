require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = require("./config/cors");
const bodyParser = require("body-parser");
const db = require("./config/DBconnection");
app.use(cors(corsOptions));

db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to Database"));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", require("./routes/api"));
module.exports = app;
