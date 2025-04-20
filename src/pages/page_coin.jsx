import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Coin_page() {
  const navigate = useNavigate();
  
  // Mock data - would come from props or state in a real app
  const selectedOffer = {
    size: "500ml",
    price: 50
  };
  
  const [insertedAmount, setInsertedAmount] = useState(20);
  const remainingAmount = selectedOffer.price - insertedAmount;

  const handleBack = () => {
    navigate(-1);
  };

  const handleRefill = () => {
    // Refill logic would go here
    alert("Dispensing your water...");
  };

  return (
    <div className="flex flex-col justify-between p-4 bg-gray-50 overflow-hidden relative">
      {/* Back Button */}
      <button 
        onClick={handleBack}
        className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg z-10"
        aria-label="Go back"
      >
        ← Return
      </button>

      {/* Title Section */}
      <header className="text-center mb-2 mt-2">
        <h1 className="text-3xl font-bold text-blue-900">Payment</h1>
        <p className="text-lg text-gray-600">Please insert coins</p>
      </header>

      {/* Payment Display */}
      <div className="flex flex-col items-center justify-center mb-4 p-4 bg-blue-900 rounded-lg">
        <h2 className="text-2xl font-bold uppercase text-white">Amount Inserted</h2>
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
          <p className="font-bold">Size:</p>
          <p>{selectedOffer.size}</p>
          <p className="font-bold">Total:</p>
          <p>₱{selectedOffer.price}</p>
        </div>
      </div>

      {/* Action Button */}
      <button 
        className={`w-full py-3 rounded-lg font-bold text-xl ${
          insertedAmount >= selectedOffer.price
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-gray-400 cursor-not-allowed'
        } text-white`}
        onClick={handleRefill}
        disabled={insertedAmount < selectedOffer.price}
      >
        {insertedAmount >= selectedOffer.price 
          ? "Confirm Refill" 
          : "Insufficient Funds"}
      </button>
    </div>
  );
}