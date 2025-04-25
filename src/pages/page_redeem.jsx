import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { sendRequest } from "../utils/api";

export function Redeem_page() {
  const navigate = useNavigate();
  const [code, setCode] = useState(["", "", "", ""]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    let timer;
    if (showSuccess) {
      timer = setTimeout(() => {
        navigate("/thankyou", {
          state: { message: "Thank you for helping the environment." },
        });
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showSuccess, navigate]);

  const handleNumberClick = (num) => {
    if (activeIndex < 4) {
      const newCode = [...code];
      newCode[activeIndex] = num;
      setCode(newCode);
      setActiveIndex(activeIndex + 1);
    }
  };

  const handleClear = () => {
    setCode(["", "", "", ""]);
    setActiveIndex(0);
  };

  const handleRedeem = () => {
    // setShowSuccess(true);
  };

  const handleProceed = () => {
    setShowSuccess(false);
    navigate("/thankyou", {
      state: { message: "Thank you for helping the environment." },
    });
  };

  return (
    <div className="flex flex-col justify-between p-3 bg-gray-50 w-full h-full overflow-hidden relative">
      {/* Success Dialog */}
      {showSuccess && (
        <div className="absolute inset-0 backdrop-blur-xl backdrop-brightness-50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-xs text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-3">Success!</h2>
            <p className="text-xl text-black mb-4">Points have been redeemed</p>
            <p className="text-sm text-gray-500 mb-4">
              Continuing in 5 seconds...
            </p>
            <button
              onClick={handleProceed}
              className="w-full py-2 bg-blue-600 text-white font-bold rounded-lg text-xl"
            >
              Proceed Now
            </button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col items-center mb-3">
        <button
          onClick={() => navigate(-1)}
          className="self-start bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded-lg"
        >
          ← Back
        </button>
        <h1 className="text-3xl font-bold text-blue-900">Redeem Points</h1>
        <p className="text-xl text-gray-600">Enter 4-digit redemption code</p>
      </div>

      {/* Code Display */}
      <div className="flex justify-center mb-4">
        <div className="flex space-x-3">
          {code.map((digit, index) => (
            <div
              key={index}
              className={`text-black w-16 h-16 border-2 rounded flex items-center justify-center text-3xl font-bold ${
                index === activeIndex
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300 bg-white"
              }`}
            >
              {digit || " "}
            </div>
          ))}
        </div>
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-1.5 mb-3">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
          <button
            key={num}
            onClick={() => handleNumberClick(num.toString())}
            className="py-2 rounded bg-blue-900 text-white font-bold hover:bg-blue-800 active:bg-blue-700 text-2xl"
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => handleNumberClick("0")}
          className="py-2 rounded bg-blue-900 text-white font-bold hover:bg-blue-800 active:bg-blue-700 text-xl col-span-2"
        >
          0
        </button>
        <button
          onClick={handleClear}
          className="py-2 rounded bg-red-600 text-white font-bold hover:bg-red-700 active:bg-red-800 text-xl"
        >
          CLR
        </button>
      </div>

      {/* Redeem Button */}
      <button
        onClick={handleRedeem}
        disabled={activeIndex !== 4}
        className={`w-full py-2 rounded font-bold ${
          activeIndex === 4
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        } text-white text-xl`}
      >
        Redeem Points
      </button>
    </div>
  );
}
