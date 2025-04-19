import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

export function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoBack = () => {
    navigate(-1); // Navigates to the previous page in history
  };

  const isHomePage = location.pathname === "/"; // Assuming "/" is your homepage route

  // Array of paths where the Back button should be unclickable
  const backButtonUnclickablePages = [
    "/no-back",
    "/another-no-back",
    "/yet-another-no-back",
  ]; // Add your paths here
  const isBackButtonUnclickable =
    backButtonUnclickablePages.includes(location.pathname) || isHomePage;

  // Array of paths where the Home button should be unclickable
  const homeButtonUnclickablePages = ["/no-home", "/another-no-home"]; // Add your paths here
  const isHomeButtonUnclickable = homeButtonUnclickablePages.includes(
    location.pathname
  );

  return (
    <div className="bg-white p-2 flex flex-row justify-between z-10 shadow-xl">
      <img
        className="w-[100px] h-auto"
        src={`/assets/swave-logo.png`}
        alt="swave_logo"
      />
      <div className="grid grid-cols-3 grid-rows-1 gap-2.5">
        {/* Websocket Connection Status  */}
        <div className="text-red-600 animate-pulse flex flex-col justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-circle-fill"
            viewBox="0 0 16 16"
          >
            <circle cx="8" cy="8" r="8" />
          </svg>
        </div>
        {/* Home Button */}
        <div className="flex flex-col justify-center">
          <Link
            to="/"
            className={`text-black hover:text-red-700 ${
              isHomeButtonUnclickable
                ? "pointer-events-none opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-house"
              viewBox="0 0 16 16"
            >
              <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
            </svg>
          </Link>
        </div>
        {/* Back Button */}
        <button
          onClick={handleGoBack}
          className={`text-black hover:text-red-700 ${
            isBackButtonUnclickable
              ? "pointer-events-none opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={isBackButtonUnclickable}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-arrow-left"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
