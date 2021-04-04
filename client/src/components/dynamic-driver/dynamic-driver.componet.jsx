import React from "react";
import "./dynamic-driver.styles.scss";
import MockImage from "./driver.jpg";
import DiscordCircle from "../discord-circle/discord-circle.component";
const DynamicDriver = ({
  userinfo: { firstName, employeeId, lastName, isActive },
}) => {
  return (
    <div className="sidecard">
      <div className="sidecard__avatar__container">
        <img alt="mock" className="sidecard__avatar" src={MockImage} />
        <DiscordCircle lightSwitch={!isActive} />
      </div>

      <div className="sidecard__content">
        <div className="sidecard__content__name">
          {firstName} {lastName}
        </div>
        <div className="sidecard__content__sub">
          <div className="sidecard__content__sub__text">
            <span>
              {employeeId}
              {/*props.position.timestamp*/}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicDriver;
