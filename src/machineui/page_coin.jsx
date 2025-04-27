import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Coin_page() {
  const [selectedOffer, setData] = useState({ volume: "", price: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Get the volume and price
    const requestData = {
      request: ["volume", "price"],
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
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  // Coin inserted |  Update every 250ms
  const [insertedAmount, setInsertedAmount] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const requestData = {
        request: ["amount"],
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
          setInsertedAmount(data.amount);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, 375);

    // Clearinterval to avoid memory leaks
    return () => clearInterval(interval);
  }, []);

  const remainingAmount =
    parseInt(selectedOffer.price.replace("₱", ""), 10) - insertedAmount;

  const handleRefill = () => {
    // First send the dispense request
    fetch("http://localhost:5000/function/dispense")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dispense response:", data);
        if (data.status === "Successful") {
          // Only navigate if the dispense was successful
          navigate("/machineui/refilling");
        } else {
          console.error("Dispense failed:", data);
          // You might want to show an error message to the user here
        }
      })
      .catch((error) => {
        console.error("Error during dispense:", error);
        // You might want to show an error message to the user here
      });
  };

  return (
    <div className="flex flex-col justify-between p-4 bg-gray-50 overflow-hidden relative">
      {/* Title Section */}
      <header className="text-center mb-2 mt-2">
        <h1 className="text-3xl font-bold text-blue-900">Payment</h1>
        <p className="text-lg text-gray-600">Please insert coins</p>
      </header>

      {/* Payment Display */}
      <div className="flex flex-col items-center justify-center mb-4 p-4 bg-blue-900 rounded-lg">
        <h2 className="text-2xl font-bold uppercase text-white">
          Amount Inserted
        </h2>
        <p className="text-5xl font-bold text-white my-2">₱{insertedAmount}</p>
        <p className="text-xl text-blue-200">
          {remainingAmount > 0
            ? `Remaining: ₱${remainingAmount}`
            : "Payment received"}
        </p>
      </div>

      {/* Selected Offer Section */}
      <div className="bg-blue-100 text-black rounded-lg p-4 mb-4">
        <h2 className="text-xl font-bold uppercase mb-2">Your Selection</h2>
        <div className="grid grid-cols-2 gap-2">
          <p className="font-bold text-xl">Size:</p>
          <p className="text-xl">{selectedOffer.volume}</p>
          <p className="font-bold text-xl">Total:</p>
          <p className="text-xl">{selectedOffer.price}</p>
        </div>
      </div>

      {/* Action Button */}
      <button
        className={`w-full py-3 rounded-lg font-bold text-xl ${
          insertedAmount >= parseInt(selectedOffer.price.replace("₱", ""), 10)
            ? "bg-green-600 hover:bg-green-700"
            : "bg-gray-400 cursor-not-allowed"
        } text-white`}
        onClick={handleRefill}
        disabled={
          insertedAmount < parseInt(selectedOffer.price.replace("₱", ""), 10)
        }
      >
        {insertedAmount >= parseInt(selectedOffer.price.replace("₱", ""), 10)
          ? "Confirm Refill"
          : "Insufficient Funds"}
      </button>
    </div>
  );
}
