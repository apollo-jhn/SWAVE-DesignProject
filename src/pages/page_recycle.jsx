import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../utils/api";

export function Recycle_page() {
  const navigate = useNavigate();
  const [bottlesInserted, setbottlesInserted] = useState(0);
  const [pointsReceived, setpointsReceived] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchData = () => {
      const requestData = {
        request: ["bottles", "points"],
      };
      fetch("http://localhost:5000/data/receive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          setbottlesInserted(data.bottles);
          setpointsReceived(data.points);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    intervalRef.current = setInterval(fetchData, 375);

    // Cleanup function to clear interval when component unmounts
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const clearPollingInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const toDonateThankYou = () => {
    clearPollingInterval();
    postRequest("http://localhost:5000/function/call", ["clear_recycleData"])
      .then(() => {
        navigate("/thankyou", {
          state: {
            message:
              "Thank you for your donation! And your effort on saving the environment.",
          },
        });
      })
      .catch((error) => {
        console.error("Dispense failed:", error);
      });
  };

  const toRedeemPoints = () => {
    clearPollingInterval();
    navigate("/redeem");
  };

  return (
    <div className="flex flex-col justify-between p-4 bg-gray-50 overflow-hidden relative min-h-screen">
      {/* Back Button */}
      <button
        onClick={() => {
          clearPollingInterval();
          navigate(-1);
        }}
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
          <p className="text-6xl font-bold text-white">{bottlesInserted}</p>
        </div>
        <div className="bg-blue-900 rounded-lg p-4 flex flex-col items-center shadow-md">
          <h2 className="text-xl font-bold uppercase mb-2 text-white">
            Points Received
          </h2>
          <p className="text-6xl font-bold text-white">{pointsReceived}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        <button
          onClick={toDonateThankYou}
          disabled={bottlesInserted === 0}
          className={`w-full py-3 rounded-lg font-bold text-xl text-white shadow-md ${
            bottlesInserted === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Donate Bottles
        </button>
        <button
          onClick={toRedeemPoints}
          disabled={bottlesInserted === 0}
          className={`w-full py-3 rounded-lg font-bold text-xl text-white shadow-md ${
            bottlesInserted === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          Redeem Rewards
        </button>
      </div>
    </div>
  );
}