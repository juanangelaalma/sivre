import React from "react";

const Heading = ({ children }) => {
  return (
    <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
      {children}
    </div>
  );
};

export default Heading;
