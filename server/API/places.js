const express = require("express");
const router = express.Router();
const fs = require("fs");
const axios = require("axios");

router.get("/:address", async (req, res) => {
  const gMapsEndpoint =
    "https://maps.googleapis.com/maps/api/place/textsearch/json?";
  const query = req.params.address;
  const key = config.get("google_maps_api");
  const storeLocation = "26.260622760871847,-80.26401677548698";
  const radius = "10000";

  const request = `${gMapsEndpoint}query=${query}&location=${storeLocation}&radius=${radius}&key=${key}`;

  axios
    .get(request)
    .then((response) => {
      saveJson(response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

router.post("/", async (req, res) => {
  const gMapsEndpoint =
    "https://maps.googleapis.com/maps/api/place/textsearch/json?";
  const query = req.body.address;
  const key = process.env.google_maps_api;
  const storeLocation = "26.260622760871847,-80.26401677548698";
  const radius = "10000";

  const request = `${gMapsEndpoint}query=${query}&location=${storeLocation}&radius=${radius}&key=${key}`;

  axios
    .get(request)
    .then((response) => {
      saveJson(response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
});

function saveJson(data) {
  const date = Date.now();
  fs.writeFile(
    `/Users/Pichu/Desktop/MAPS test for react/json/${date}.json`,
    JSON.stringify(data, null, 2),
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        console.log("saved file: ", date);
      }
    }
  );
}

module.exports = router;
