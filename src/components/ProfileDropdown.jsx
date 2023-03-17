import React, { useState } from "react";
import { Link } from "react-router-dom";

const ProfileDropdown = ({ children }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative ml-3">
      <div>
        <button
          type="button"
          className="flex rounded-full text-sm focus:outline-none text-gray-400 items-center space-x-2"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="sr-only">Open user menu</span>
          {children}
          <svg
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.9999 1.17019C10.8126 0.983936 10.5591 0.879395 10.2949 0.879395C10.0308 0.879395 9.77731 0.983936 9.58995 1.17019L5.99995 4.71019L2.45995 1.17019C2.27259 0.983936 2.01913 0.879395 1.75495 0.879395C1.49076 0.879395 1.23731 0.983936 1.04995 1.17019C0.95622 1.26315 0.881826 1.37375 0.831057 1.49561C0.780288 1.61747 0.75415 1.74818 0.75415 1.88019C0.75415 2.0122 0.780288 2.1429 0.831057 2.26476C0.881826 2.38662 0.95622 2.49722 1.04995 2.59019L5.28995 6.83019C5.38291 6.92392 5.49351 6.99831 5.61537 7.04908C5.73723 7.09985 5.86794 7.12599 5.99995 7.12599C6.13196 7.12599 6.26267 7.09985 6.38453 7.04908C6.50638 6.99831 6.61699 6.92392 6.70995 6.83019L10.9999 2.59019C11.0937 2.49722 11.1681 2.38662 11.2188 2.26476C11.2696 2.1429 11.2957 2.0122 11.2957 1.88019C11.2957 1.74818 11.2696 1.61747 11.2188 1.49561C11.1681 1.37375 11.0937 1.26315 10.9999 1.17019Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
      <div
        className={`absolute right-0 z-10 mt-2 py-0 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none${
          isDropdownOpen ? "" : " hidden"
        }`}
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabIndex={-1}
      >
        <Link
          to="/admin/logout"
          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
          role="menuitem"
          tabIndex={-1}
          id="user-menu-item-2"
        >
          Sign out
        </Link>
      </div>
    </div>
  );
};

export default ProfileDropdown;
