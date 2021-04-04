const express = require("express");
const app = express.Router();
const users = require("../../../API/users");

app.use(users);