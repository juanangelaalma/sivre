import React, { useEffect, useState } from "react";
import useFetcher from "../../hooks/useFetcher";
import AdminLayout from "../../components/AdminLayout";
import { API_URL } from "../../configs/api";
import {
  CandateModal,
  DeleteConfirmModal,
  PrimaryButton,
  Spinner,
} from "../../components";

const Candidates = () => {
  const fetcher = useFetcher();
  const [loading, setLoading] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const getCandidates = async () => {
    try {
      setLoading(true);
      const response = await fetcher(`${API_URL}/candidates`);
      setCandidates(response.data.data.candidates);
      setLoading(false);
    } catch (err) {
      setError("something error");
    }
  };

  const truncate = (str) => {
    const max = 35;
    return str.length > max ? str.substring(0, max) + "..." : str;
  };

  const handleOpenModalDelete = (candidate) => {
    setSelectedCandidate(candidate);
    setDeleteModalIsOpen(true);
  };

  const handleDeleteCandidate = async () => {
    try {
      setDeleteModalIsOpen(false);
      fetcher(`${API_URL}/candidates/${selectedCandidate.id}`, {
        method: "DELETE",
      });
      getCandidates();
    } catch (err) {
      setError("something error");
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  return (
    <AdminLayout>
      <CandateModal
        refresh={getCandidates}
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
      />
      <DeleteConfirmModal
        isOpen={deleteModalIsOpen}
        closeModal={() => setDeleteModalIsOpen(false)}
        handleConfirm={handleDeleteCandidate}
      />
      {/* component */}
      <div className="w-1/2 sm:w-1/3 md:w-1/4">
        <PrimaryButton onClick={() => setModalIsOpen(true)}>
          + Add Candidate
        </PrimaryButton>
      </div>
      <div className="rounded-lg border border-gray-100 m-5 overflow-x-scroll md:overflow-hidden">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Chairman
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Vision
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Mission
              </th>
              <th
                scope="col"
                className="px-6 py-4 font-medium text-gray-900"
              ></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 border-t border-gray-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-4">
                  <Spinner />
                </td>
              </tr>
            ) : (
              candidates &&
              candidates.map((candidate) => (
                <tr key={candidate.id} className="hover:bg-gray-50">
                  <td className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                    <div className="relative h-10 w-10">
                      <img
                        className="h-full w-full rounded-full object-cover object-center"
                        src={candidate.chairman_photo}
                        alt=""
                      />
                      <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white" />
                    </div>
                    <div className="text-sm flex items-center md:block">
                      <div className="font-medium text-gray-700 truncate">
                        {candidate.chairman_name}
                      </div>
                      <div className="text-gray-400 hidden md:block truncate">
                        additional info
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 truncate">
                    {truncate(candidate.vision)}
                  </td>
                  <td className="px-6 py-4 truncate">
                    {truncate(candidate.mission)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-4">
                      <button
                        onClick={() => handleOpenModalDelete(candidate)}
                        className="cursor-pointer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                          x-tooltip="tooltip"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </button>
                      <a x-data="{ tooltip: 'Edite' }" href="#">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                          x-tooltip="tooltip"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                          />
                        </svg>
                      </a>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Candidates;
