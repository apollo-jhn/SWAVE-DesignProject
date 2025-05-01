import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../tools/api_request";

export function MachineUI_Recycle_Bottles() {
    const navigate = useNavigate();
    const [bottlesInserted, setbottlesInserted] = useState(0);
    const [pointsReceived, setpointsReceived] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await postRequest("/data/get", {
                    request: ["bottle_inserted", "points_acquired"],
                });
                setbottlesInserted(data.bottle_inserted);
                setpointsReceived(data.points_acquired);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
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

    const toDonateThankYou = async () => {
        clearPollingInterval();
        try {
            await postRequest("/function/call", {
                function: "clear_bottle_data_values",
            });
            navigate("/machineui/thankyou", {
                state: {
                    message:
                        "Thank you for your donation! And your effort on saving the environment.",
                },
            });
        } catch (error) {
            console.error("Dispense failed:", error);
        }
    };

    const toRedeemPoints = () => {
        clearPollingInterval();
        navigate("/machineui/recycle/redeem");
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
                    <p className="text-6xl font-bold text-white">
                        {bottlesInserted}
                    </p>
                </div>
                <div className="bg-blue-900 rounded-lg p-4 flex flex-col items-center shadow-md">
                    <h2 className="text-xl font-bold uppercase mb-2 text-white">
                        Points Received
                    </h2>
                    <p className="text-6xl font-bold text-white">
                        {parseFloat(pointsReceived).toFixed(2)}
                    </p>
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
