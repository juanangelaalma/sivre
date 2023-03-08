import React, { useEffect, useState } from "react";
import {
  DeleteConfirmModal,
  Paragraph,
  PrimaryButton,
  Spinner,
  VoterModal,
} from "../../components";
import AdminLayout from "../../components/AdminLayout";
import Button from "../../components/Button";
import { API_URL } from "../../configs/api";
import useFetcher from "../../hooks/useFetcher";

const Voters = () => {
  const [loading, setLoading] = useState(false);
  const [voters, setVoters] = useState([]);
  const [votersCount, setVotersCount] = useState(0);
  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false);

  const fetcher = useFetcher();

  const getVoters = async () => {
    setLoading(true);
    try {
      const response = await fetcher(`${API_URL}/voters/list`);
      setVoters(response.data.data.voters);
      setVotersCount(response.data.data.total);
    } catch (err) {
      console.log(err);
    }
    setLoading(false);
  };

  const handleDestroyVoters = async () => {
    try {
      setDeleteModalIsOpen(false);
      fetcher(`${API_URL}/voters/destroy`, {
        method: "DELETE",
      });
      getVoters();
    } catch (err) {
      console.log(err);
    }
  };

  const handleExportAsExcel = async () => {
    // axios download
    const response = await fetcher(`${API_URL}/voters/export`, {
      method: "GET",
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
  };

  useEffect(() => {
    getVoters();
  }, []);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleGenerateVoters = (count) => {
    return fetcher(
      `${API_URL}/voters/generate`,
      {
        method: "POST",
      },
      {
        amount: count,
      }
    );
  };

  return (
    <AdminLayout>
      <VoterModal
        isOpen={modalIsOpen}
        closeModal={() => setModalIsOpen(false)}
        handleSubmit={handleGenerateVoters}
        refresh={getVoters}
      />
      <DeleteConfirmModal
        isOpen={deleteModalIsOpen}
        closeModal={() => setDeleteModalIsOpen(false)}
        handleConfirm={handleDestroyVoters}
        message="Are you sure want to destroy all voters?"
      />
      <div className="flex justify-between mx-5 items-end">
        <div className="flex justify-start items-end space-x-2">
          <PrimaryButton
            onClick={() => setModalIsOpen(true)}
            className="py-2 truncate rounded-md"
          >
            Add
          </PrimaryButton>
          <PrimaryButton
            onClick={handleExportAsExcel}
            className="py-2 truncate rounded-md"
          >
            Print
          </PrimaryButton>
          <PrimaryButton
            onClick={() => setDeleteModalIsOpen(true)}
            className="py-2 from-red-500 to-red-600 rounded-md hover:from-red-600 hover:to-red-500"
          >
            Destroy
          </PrimaryButton>
        </div>
        <Paragraph>Count: {votersCount}</Paragraph>
      </div>
      <div className="rounded-lg border border-gray-100 m-5 overflow-x-scroll md:overflow-hidden">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Username
              </th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">
                Password
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
              voters.map((voter) => (
                <tr key={voter.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 truncate">{voter.username}</td>
                  <td className="px-6 py-4 truncate">{voter.password}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Voters;
