import React from "react";

const MockImage = ({ fill, priority, ...props }: any) => {
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} alt={props.alt || ""} />;
};

export default MockImage;
