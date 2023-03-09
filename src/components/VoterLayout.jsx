import React from "react";
import VoterNavbar from "./VoterNavbar";

const VoterLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <VoterNavbar />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
};

export default VoterLayout;
