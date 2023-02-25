import React from "react";

const Button = ({ children, className, type, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-2xl tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
