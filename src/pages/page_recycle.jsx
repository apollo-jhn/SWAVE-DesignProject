import React from "react";
import { useNavigate } from "react-router-dom";

export function Recycle_page() {
  const navigate = useNavigate();

  const toDonateThankYou = () => {
    navigate("/thankyou", {
      state: {
        message: "Thank you for your donation! And your effort on saving the environment.",
      },
    }); // To thank you page
  };

  return (
    <div className="flex flex-col justify-between p-4 bg-gray-50 overflow-hidden relative min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg z-10"
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* Title Section */}
      <header className="text-center mb-6 mt-2">
        <h1 className="text-3xl font-bold text-blue-900">
          Recycle PET Bottles
        </h1>
        <p className="text-lg text-gray-600">
          Insert your empty bottles to earn points or donate.
        </p>
      </header>

      {/* Counters Section - Improved Contrast */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-blue-900 rounded-lg p-4 flex flex-col items-center shadow-md">
          <h2 className="text-xl font-bold uppercase mb-2 text-white">
            Bottle Counter
          </h2>
          <p className="text-6xl font-bold text-white">00</p>
        </div>
        <div className="bg-blue-900 rounded-lg p-4 flex flex-col items-center shadow-md">
          <h2 className="text-xl font-bold uppercase mb-2 text-white">
            Points Received
          </h2>
          <p className="text-6xl font-bold text-white">00</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <button onClick={toDonateThankYou} className="w-full py-3 rounded-lg font-bold text-xl bg-green-600 hover:bg-green-700 text-white shadow-md">
          Donate Bottles
        </button>
        <button className="w-full py-3 rounded-lg font-bold text-xl bg-purple-600 hover:bg-purple-700 text-white shadow-md">
          Redeem Rewards
        </button>
      </div>
    </div>
  );
}
