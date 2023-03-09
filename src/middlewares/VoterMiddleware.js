import React from "react";
import { Navigate } from "react-router-dom";
import { useVoter } from "../context/VoterContext";
import useLocalStorage from "../hooks/useLocalStorage";

const VoterMiddleware = (props) => {
  const [voterDataStorage, setVoterDataStorage] = useLocalStorage("voterData");

  if (!voterDataStorage) {
    return <Navigate to="/login" />;
  }

  return <>{props.children}</>;
};

export default VoterMiddleware;
