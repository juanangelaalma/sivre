import React from "react";
import Button from "./Button";

const PrimaryButton = ({ children, className, type, onClick }) => {
  return (
    <Button className={className} type={type} onClick={onClick}>
      {children}
    </Button>
  );
};

export default PrimaryButton;
