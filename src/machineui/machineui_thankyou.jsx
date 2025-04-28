import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export function MachineUI_Thankyou() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get message from location state or use default
  const completionMessage = location.state?.message || "Your refill is complete. Enjoy your fresh water!";

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/machineui");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gray-50 min-h-screen">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-3xl font-bold text-blue-900 mb-2">Thank You!</h1>
        <p className="text-xl text-gray-600 mb-6">
          {completionMessage}
        </p>
        <p className="text-sm text-gray-500 mb-4">
          Returning to home in 5 seconds...
        </p>
        <button
          onClick={() => navigate("/machineui")}
          className="w-full py-3 rounded-lg font-bold text-xl bg-blue-600 hover:bg-blue-700 text-white"
        >
          Return to Home Now
        </button>
      </div>
    </div>
  );
}