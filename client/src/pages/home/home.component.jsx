import React from "react";

import "./home.styles.scss";
import pasquales from "./client1.png";
const HomePage = () => {
  return (
    <div className="homepage">
      <p>The App is currently in development mode 🚧 🔨 🔨 </p>
      <br />
      <p>Please click on Map to see the overall progress then..</p>
      <br />
      <p>Click on the red arrow.</p>
      <br />
      <p>From there by pressing the generate user button </p>
      <br />
      <p> You can simulate a driver from using the mobile app in Real Time</p>
      <br />
      <p> You can also drag an order to a driver</p>
      <br />
      <p>
        If you are interested in our product please don't hesistate to email us
        <br />
        <br />
        easyrun32@gmail.com
        <br />
        <br />
        Currently interested client
      </p>
      <br />
      <a href="https://pasqualeandsons.com/">
        <img src={pasquales} alt="client1" className="homepage__client1-img" />
      </a>
      <br />
    </div>
  );
};

export default HomePage;
