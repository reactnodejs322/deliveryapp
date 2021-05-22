import React, { useEffect, useState } from "react";

export const Expire = ({ children, autoHideDuration }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
    }, autoHideDuration);

    return () => {
      setVisible(false);
    };
  }, [autoHideDuration]);

  // visible = the component will expire during timeout
  // children.props[Object.keys(children.props)[0]] =
  // get the first prop key of children.props and
  // check if it's undefined <- the key's value should start as undefined
  // it will ensure that it does not render when nothing is shown
  return visible && children.props[Object.keys(children.props)[0]] ? (
    <div>{children}</div>
  ) : null;
};

export default Expire;
