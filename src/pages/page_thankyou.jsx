import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ThankYou_page() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000); // 5 seconds delay before auto-redirect

    return () => clearTimeout(timer); // Cleanup on component unmount
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 min-h-screen">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Thank You!</h1>
        <p className="text-xl text-gray-600 mb-6">
          Your refill is complete. Enjoy your fresh water!
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Returning to home in 5 seconds...
        </p>
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 rounded-lg font-bold text-xl bg-blue-600 hover:bg-blue-700 text-white"
        >
          Return to Home Now
        </button>
      </div>
    </div>
  );
}