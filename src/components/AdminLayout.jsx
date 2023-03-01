import React from "react";
import Navbar from "./Navbar";

const AdminLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-8">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;
