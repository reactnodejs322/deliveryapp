const path = require("path");

module.exports = function (app) {
  const express = require("express");
  const orders = require("../API/orders");
  const users = require("../API/users");
  const stores = require("../API/stores");

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  app.use("/api/stores", stores);

  app.use("/api/orders", orders);
  app.use("/api/users", users);
};
