import React, { useEffect, useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import PrimaryButton from "./PrimaryButton";
import { FaRegEye } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useVoter } from "../context/VoterContext";
import Paragraph from "./Paragraph";

const VoterNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { voterData } = useVoter();

  const isCurrentPath = (currentPath) => {
    return location.pathname === currentPath;
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="block h-8 w-auto lg:hidden"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
              <img
                className="hidden h-8 w-auto lg:block"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  href="#"
                  className={`text-gray-500 rounded-md px-3 py-2 text-sm font-medium${
                    isCurrentPath("/admin/dashboard") ? " bg-gray-100" : ""
                  }`}
                  aria-current="page"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <PrimaryButton
              type="submit"
              className="from-orange-500 to-yellow-400 text-white rounded-lg py-2 hover:from-yellow-400 hover:to-orange-400 flex items-center font-normal text-sm shadow-none"
            >
              <FaRegEye className="mr-1" /> Voting Results
            </PrimaryButton>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto ml-3 sm:pr-0">
            <ProfileDropdown>
              <Paragraph className="mx-2">{voterData.username}</Paragraph>
            </ProfileDropdown>
          </div>
        </div>
      </div>
      <div
        className={`sm:hidden ${isMenuOpen ? "" : " hidden"}`}
        id="mobile-menu"
      >
        <div className="space-y-1 px-2 pt-2 pb-3">
          <Link
            to="/"
            href="#"
            className={`text-gray-500 block rounded-md px-3 py-2 text-base font-medium ${
              isCurrentPath("/admin/dashboard") ? " bg-gray-100" : ""
            }`}
            aria-current="page"
          >
            Home
          </Link>
          <PrimaryButton
            type="submit"
            className="from-orange-500 to-yellow-400 text-white rounded-lg py-3 hover:from-yellow-400 hover:to-orange-400 flex items-center font-normal text-sm w-1/2 shadow-none"
          >
            <FaRegEye className="mr-1" /> Voting Results
          </PrimaryButton>
        </div>
      </div>
    </nav>
  );
};

export default VoterNavbar;
