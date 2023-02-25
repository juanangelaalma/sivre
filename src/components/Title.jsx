import React from "react";

const Title = ({ children, className }) => {
  return (
    <h2 className={`mt-6 text-3xl font-bold text-gray-900 ${className}`}>
      {children}
    </h2>
  );
};

export default Title;
