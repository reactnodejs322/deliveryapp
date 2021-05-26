import React from "react";

export const Display = ({ disconnect_snackbar: { disconnectedDriver } }) => {
  return <div>{disconnectedDriver}:info</div>;
};

export default Display;
