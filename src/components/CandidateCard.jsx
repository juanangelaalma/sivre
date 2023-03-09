import React from "react";
import PrimaryButton from "./PrimaryButton";

const CandidateCard = ({
  candidate,
  selectedCandidate,
  setSelectedCandidate,
}) => {
  const isSelected = selectedCandidate?.id === candidate.id;
  return (
    <div
      onClick={() => setSelectedCandidate(candidate)}
      className={`w-full md:w-1/4 p-6 bg-white rounded-xl shadow-xl hover:shadow-2xl scale-90 transition-transform transform duration-500 cursor-pointer text-gray-700 ${
        isSelected
          ? "bg-gradient-to-b from-indigo-600 to-blue-500 scale-[.95] transition duration-500 ease-in-out text-white"
          : ""
      }`}
    >
      <img
        className="w-full md:w-64 object-cover rounded-t-md h-80 md:h-64 object-top"
        src={candidate.chairman_photo}
        alt=""
      />
      <div className="mt-4">
        <h1 className="text-2xl font-bold">{candidate.chairman_name}</h1>
        <div className="mt-2">
          <h6 className="text-md font-bold">Visi:</h6>
          <p className="text-sm">{candidate.vision}</p>
        </div>
        <div className="mt-2">
          <h6 className="text-md font-bold">Misi:</h6>
          <p className="text-sm">{candidate.mission}</p>
        </div>
      </div>
    </div>
  );
};

export default CandidateCard;
