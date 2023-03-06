import React, { useEffect, useRef, useState } from "react";
import FormInput from "./FormInput";
import defaultProfilePicture from "../assets/images/default-profile-picture.jpg";
import useFetcher from "../hooks/useFetcher";
import { API_URL } from "../configs/api";
import LoaderButton from "./LoaderButton";

const CandidateModal = ({
  isOpen,
  closeModal,
  refresh,
  handleSendData,
  selectedCandidate,
}) => {
  const [chairmanName, setChairmanName] = useState("");
  const [vision, setVision] = useState("");
  const [mission, setMission] = useState("");
  const [chairmanPhoto, setChairmanPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetcher = useFetcher();
  const profilePicture = useRef();

  const createFormData = () => {
    const formData = new FormData();
    formData.append("chairman_name", chairmanName);
    formData.append("vision", vision);
    formData.append("mission", mission);
    if (chairmanPhoto) formData.append("chairman_photo", chairmanPhoto);
    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCandidate = createFormData();
    console.log(chairmanName, vision, mission, chairmanPhoto);
    setLoading(true);
    await handleSendData(newCandidate);
    resetInput();
    setLoading(false);
    closeModal();
    refresh();
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setChairmanPhoto(file);
  };

  useEffect(() => {
    if (selectedCandidate && !chairmanPhoto) {
      profilePicture.current.src = selectedCandidate.chairman_photo;
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        profilePicture.current.src = reader.result;
      };
      if (chairmanPhoto) {
        reader.readAsDataURL(chairmanPhoto);
      } else {
        profilePicture.current.src = defaultProfilePicture;
      }
    }
  }, [chairmanPhoto, selectedCandidate]);

  useEffect(() => {
    if (selectedCandidate) {
      setChairmanName(selectedCandidate.chairman_name);
      setVision(selectedCandidate.vision);
      setMission(selectedCandidate.mission);
    }
    return () => {
      resetInput();
    };
  }, [selectedCandidate]);

  const resetInput = () => {
    setChairmanName("");
    setVision("");
    setMission("");
    setChairmanPhoto(null);
  };

  return (
    <div
      style={{ zIndex: 1000 }}
      className={`modal fixed w-full h-full top-0 left-0 flex items-center justify-center ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50" />
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-close absolute top-0 right-0 cursor-pointer flex flex-col items-center mt-4 mr-4 text-white text-sm z-50">
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 18 18"
          >
            <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
          </svg>
          <span className="text-sm">(Esc)</span>
        </div>
        {/* Add margin if you want to see some of the overlay behind the modal*/}
        <div className="modal-content py-4 text-left px-6">
          {/*Title*/}
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Add Candidate!</p>
            <div
              onClick={closeModal}
              className="modal-close cursor-pointer z-50"
            >
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width={18}
                height={18}
                viewBox="0 0 18 18"
              >
                <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z" />
              </svg>
            </div>
          </div>
          {/*Body*/}
          <form onSubmit={handleSubmit}>
            <div className="w-full justify-center pb-4">
              <div className="w-[80px] text-center mx-auto mt-4 relative h-[80px]">
                <div className="w-[80px]">
                  <img
                    ref={profilePicture}
                    className="w-[80px] h-[80px] rounded-full absolute object-cover object-center"
                    src=""
                    alt=""
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = defaultProfilePicture;
                    }}
                  />
                  <label
                    htmlFor="profilePictureInput"
                    className="w-[80px] h-[80px] group hover:bg-gray-200 opacity-60 rounded-full absolute flex justify-center items-center cursor-pointer transition duration-500"
                  >
                    <img
                      className="hidden group-hover:block w-8"
                      src="https://www.svgrepo.com/show/33565/upload.svg"
                      alt=""
                    />
                  </label>
                  <input
                    onChange={handlePhotoChange}
                    type="file"
                    className="hidden"
                    name="image"
                    id="profilePictureInput"
                  />
                </div>
              </div>
            </div>
            <FormInput
              className="mt-4"
              type="text"
              name="chairman_name"
              placeholder="masukkan nama ketua"
              label="Name Ketua"
              autoFocus={true}
              value={chairmanName}
              onChange={setChairmanName}
            />
            <FormInput
              className="mt-4"
              type="text"
              name="vision"
              placeholder="masukkan visi"
              label="Visi"
              autoFocus={true}
              value={vision}
              onChange={setVision}
            />
            <FormInput
              className="mt-4"
              type="text"
              name="mission"
              placeholder="masukkan misi"
              label="Misi"
              autoFocus={true}
              value={mission}
              onChange={setMission}
            />
            {/*Footer*/}
            <div className="flex justify-end pt-4">
              <div
                onClick={closeModal}
                className="px-4 cursor-pointer bg-transparent p-3 rounded-lg text-indigo-500 hover:bg-gray-100 hover:text-indigo-400 mr-2"
              >
                Close
              </div>
              <button className="modal-close px-4 bg-indigo-500 p-3 rounded-lg text-white hover:bg-indigo-400">
                {loading ? <LoaderButton /> : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CandidateModal;
