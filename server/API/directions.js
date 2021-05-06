const express = require("express");
const router = express.Router();
const http = require("http");
const https = require("https");
const axios = require("axios");
const fs = require("fs");
const { Client, TravelMode } = require("@googlemaps/google-maps-services-js");
const Loader = require("@googlemaps/js-api-loader");

router.get("/:origin/:destination/:waypoints", async (req, res) => {
  const gMapsEndpoint = "https://maps.googleapis.com/maps/api/directions/json?";
  const origin = req.params.origin;
  const destination = req.params.destination;
  const waypoints = req.params.waypoints;

  let query;
  if (!req.params.waypoints) {
    query =
      gMapsEndpoint +
      `origin=${origin}&destination=${destination}&key=${process.env.google_maps_api}`;
  } else {
    query =
      gMapsEndpoint +
      `origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${process.env.google_maps_api}`;
  }

  console.log(query);
  // const res = http.get(query)

  res.status(200).send({
    origin,
    destination,
    waypoints,
  });
});

router.post("/", async (req, res) => {
  const gMapsEndpoint = "https://maps.googleapis.com/maps/api/directions/json?";
  const origin = req.body.origin;
  const destination = req.body.destination;
  let query;
  if (req.body.waypoints && req.body.waypoints.lenght === 1) {
    const waypoint = req.body.waypoints;
    query =
      gMapsEndpoint +
      `origin=${origin}&destination=${destination}&waypoints=${waypoint}&key=${process.env.google_maps_api}`;
  } else if (req.body.waypoints && req.body.waypoints.length > 1) {
    let waypoints = req.body.waypoints[0].replace(/ /g, "+");

    for (let i = 1; i < req.body.waypoints.length; i++) {
      waypoints += "|" + req.body.waypoints[i].replace(/ /g, "+");
    }

    query =
      gMapsEndpoint +
      `origin=${origin}&destination=${destination}&waypoints=${waypoints}&mode=driving&key=${process.env.google_maps_api}`;
  } else if (!req.body.waypoints) {
    query =
      gMapsEndpoint +
      `origin=${origin}&destination=${destination}&key=${process.env.google_maps_api}`;
  }

  axios
    .get(query)
    .then((result) => {
      console.log(result.data);
      res.send(result.data);
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
});

module.exports = router;

// const loader = new Loader({
//     apiKey : config.get('google_maps_api'),
//     version : "weekly"
// });
// loader.load().then(()=>{
//     const directionService = new google.maps.DirectionService();

//     directionService.route(
//      {
//        origin: {
//          query: "26.256373567888886,-80.26731872318315",
//        },
//        destination: {
//          query: "26.23724030100843,-80.24496529134902",
//        },
//        travelMode: google.maps.TravelMode.DRIVING,
//      },
//  (response, status) => {
//    if (status === "OK") {
//        console.log(JSON.stringify(response, null, 2))
//      res.send(response)
//    } else {
//      console.log("FAILED REQUEST, STATUS: ", status)
//    }
//  }
//    );
// })

// import invariant from 'invariant'

// module.exports.Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[]

// module.exports = LoadScriptUrlOptions {
//   googleMapsApiKey: string | ""
//   googleMapsClientId?: string
//   version?: string
//   language?: string
//   region?: string
//   libraries?: Libraries
//   channel?: string
//   mapIds?: string[]
// }

// export function makeLoadScriptUrl({
//   googleMapsApiKey,
//   googleMapsClientId,
//   version = 'weekly',
//   language,
//   region,
//   libraries,
//   channel,
//   mapIds
// }: LoadScriptUrlOptions): string {
//   const params = []

//   invariant(
//     (googleMapsApiKey && googleMapsClientId) || !(googleMapsApiKey && googleMapsClientId),
//     'You need to specify either googleMapsApiKey or googleMapsClientId for @react-google-maps/api load script to work. You cannot use both at the same time.'
//   )

//   if (googleMapsApiKey) {
//     params.push(`key=${googleMapsApiKey}`)
//   } else if (googleMapsClientId) {
//     params.push(`client=${googleMapsClientId}`)
//   }

//   if (version) {
//     params.push(`v=${version}`)
//   }

//   if (language) {
//     params.push(`language=${language}`)
//   }

//   if (region) {
//     params.push(`region=${region}`)
//   }

//   if (libraries && libraries.length) {
//     params.push(`libraries=${libraries.sort().join(',')}`)
//   }

//   if (channel) {
//     params.push(`channel=${channel}`)
//   }

//   if (mapIds && mapIds.length) {
//     params.push(`map_ids=${mapIds.join(',')}`)
//   }

//   params.push('callback=initMap')

//   return `https://maps.googleapis.com/maps/api/js?${params.join('&')}`
// }
