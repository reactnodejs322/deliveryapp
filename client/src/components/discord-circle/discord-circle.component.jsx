import React from "react";
import "./discord-circle.styles.scss";
const DiscordCircle = ({ lightSwitch }) => {
  return (
    <div className="discord-circle-container">
      {lightSwitch ? (
        <div className="online-circle " />
      ) : (
        <div className="offline-circle" />
      )}
    </div>
  );
};

export default DiscordCircle;
