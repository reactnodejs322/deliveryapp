import React from "react";
import "../animated-pointers/animated-pointer.scss";

const AnimatedPointer: React.FC = () => {
  return (
    <div className="round">
      <div id="cta">
        <span className="arrow-order-pointer first next "></span>
        <span className="arrow-order-pointer second next "></span>
      </div>
    </div>
  );
};

export default AnimatedPointer;
