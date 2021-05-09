const express = require("express");
const router = express.Router();
const path = require("path");

router.get("/", (req, res) => {
  res.sendFile(path.join(__filename, "public", "index.html"));
});

module.exports = router;
