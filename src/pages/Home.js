import React, { useEffect, useState } from "react";
import { CandidateCard, PrimaryButton, Spinner } from "../components";
import VoterLayout from "../components/VoterLayout";
import { API_URL } from "../configs/api";
import useLocalStorage from "../hooks/useLocalStorage";
import useVoterFetcher from "../hooks/useVoterFetcher";
import voted from "../assets/images/voted.png";
import { Navigate, useNavigate } from "react-router-dom";
import { useVoter } from "../context/VoterContext";

const Home = () => {
  const [candidates, setCandidates] = useState([]);
  const fetcher = useVoterFetcher();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hasVoted, setHasVoted] = useLocalStorage("hasVoted", false);
  const { logout } = useVoter();

  const navigate = useNavigate();

  const getCandidates = async () => {
    setLoading(true);
    try {
      const response = await fetcher(`${API_URL}/candidates`, {
        method: "GET",
      });
      setCandidates(response.data.data.candidates);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleVote = async () => {
    try {
      fetcher(`${API_URL}/candidates/${selectedCandidate?.id}/votes`, {
        method: "POST",
      });
      setHasVoted(true);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  const handleLogout = () => {
    setHasVoted(false);
    logout();
  };

  return (
    <VoterLayout>
      {hasVoted ? (
        <div className="flex flex-col items-center">
          <img className="w-full md:w-1/3" src={voted} alt="" />
          <PrimaryButton
            onClick={handleLogout}
            className="w-1/3 md:w-[10%] py-2 rounded-md"
          >
            Keluar
          </PrimaryButton>
        </div>
      ) : (
        <>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="flex justify-center flex-wrap md:space-y-0 md:space-x-8">
                {candidates.map((candidate) => (
                  <CandidateCard
                    selectedCandidate={selectedCandidate}
                    setSelectedCandidate={setSelectedCandidate}
                    candidate={candidate}
                  />
                ))}
              </div>
              <div className="w-full md:w-1/4 mx-auto mt-10 mb-2 pl-4 pr-2">
                <PrimaryButton onClick={handleVote}>
                  Pilih Kandidat
                </PrimaryButton>
              </div>
            </>
          )}
        </>
      )}
    </VoterLayout>
  );
};

export default Home;
