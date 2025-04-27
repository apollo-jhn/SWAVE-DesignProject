import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Options_page() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const navigate = useNavigate();

  const volumeOptions = [
    { size: "350ml", price: "₱35" },
    { size: "500ml", price: "₱50" },
    { size: "750ml", price: "₱75" },
    { size: "1000ml", price: "₱99" },
  ];

  const handleOptionClick = (index) => {
    if (!isLocked) {
      setSelectedOption(selectedOption === index ? null : index);
    }
  };

  const toggleLockOption = () => {
    setIsLocked(!isLocked);
  };

  const handleProceed = () => {
    if (selectedOption !== null) {
      const selectedVolume = volumeOptions[selectedOption];
      const requestData = {
        volume: selectedVolume.size,
        price: selectedVolume.price,
      };

      // Send POST request to backend
      fetch("http://localhost:5000/data/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          navigate("/machineui/coin");
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="flex flex-col justify-between p-4 bg-gray-50 overflow-hidden relative">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg z-10"
        aria-label="Go back"
      >
        ← Back
      </button>

      {/* Title Section */}
      <header className="text-center mb-2 mt-2">
        <h1 className="text-3xl font-bold text-blue-900">
          Select Water Volume
        </h1>
        <p className="text-lg text-gray-600">Choose your preferred size</p>
      </header>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
        {volumeOptions.map((option, index) => (
          <button
            key={option.size}
            className={`rounded-lg p-2 flex flex-col items-center justify-center transition-all ${
              selectedOption === index
                ? isLocked
                  ? "bg-blue-700"
                  : "bg-blue-600"
                : isLocked
                ? "bg-blue-900 opacity-70"
                : "bg-blue-900 hover:bg-blue-800"
            } ${isLocked ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={() => handleOptionClick(index)}
            disabled={isLocked}
          >
            <p className="text-white font-bold text-4xl">{option.size}</p>
            <p className="text-white text-3xl">{option.price}</p>
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 mt-3">
        <button
          className={`w-full py-3 rounded-lg font-bold text-xl ${
            selectedOption !== null
              ? isLocked
                ? "bg-yellow-600 hover:bg-yellow-700"
                : "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          } text-white`}
          onClick={toggleLockOption}
          disabled={selectedOption === null}
        >
          {isLocked ? "Unlock" : "Lock Selection"}
        </button>

        <button
          className={`w-full py-3 rounded-lg font-bold text-xl ${
            isLocked
              ? "bg-purple-600 hover:bg-purple-700"
              : "bg-gray-400 cursor-not-allowed"
          } text-white`}
          onClick={handleProceed}
          disabled={!isLocked}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
