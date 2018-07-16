const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const verify = require("./authentication/verify");
const routes = require("./routes");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/verify", verify);
app.use("/", routes);

module.exports = app;
