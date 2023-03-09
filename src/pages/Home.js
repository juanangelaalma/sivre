import React, { useEffect, useState } from "react";
import { CandidateCard, PrimaryButton, Spinner } from "../components";
import VoterLayout from "../components/VoterLayout";
import { API_URL } from "../configs/api";
import useVoterFetcher from "../hooks/useVoterFetcher";

const Home = () => {
  const [candidates, setCandidates] = useState([]);
  const fetcher = useVoterFetcher();
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <VoterLayout>
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
            <PrimaryButton>Pilih Kandidat</PrimaryButton>
          </div>
        </>
      )}
    </VoterLayout>
  );
};

export default Home;
