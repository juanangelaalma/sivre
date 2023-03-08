import React from "react";
import { RouterProvider } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { VoterProvider } from "./context/VoterContext";
import router from "./router";

const App = () => {
  return (
    <AuthProvider>
      <VoterProvider>
        <RouterProvider router={router} />
      </VoterProvider>
    </AuthProvider>
  );
};

export default App;
