import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../tools/api_request";


export function MachineUI_Buy_Dispense() {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [isFilling, setIsFilling] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [timeInterval, setTimeInterval] = useState(2000); // Default fallback value in ms

    // Get the time interval of the loading screen from the backend
    useEffect(() => {
        const _fetchData = async () => {
            try {
                const requestData = {
                    request: ["dispense_interval"],
                };
                const _data = await postRequest("/data/get", requestData);
                if (_data.status == "good") {
                    setTimeInterval(_data.dispense_interval);
                }
            } catch (error) {
                console.error(
                    "Failed to call the function dispense water:",
                    error
                );
            }
        };

        _fetchData();
    }, []); 
    useEffect(() => {
        let interval;
        const increment = 100 / (timeInterval / 200); // Calculate increment based on total time

        if (isFilling) {
            interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setIsFilling(false);
                        setShowSuccess(true);
                        return 100;
                    }
                    return prev + increment;
                });
            }, 200); // Update every 200ms for smooth animation
        }

        return () => clearInterval(interval);
    }, [isFilling, timeInterval]); // Added timeInterval to dependencies

    useEffect(() => {
        if (showSuccess) {
            const timer = setTimeout(
                () => navigate("/machineui/thankyou"),
                2000
            );
            return () => clearTimeout(timer);
        }
    }, [showSuccess, navigate]);

    const handleStop = () => {
        setIsFilling(false);
        setShowSuccess(true);
    };

    return (
        <div className="flex flex-col justify-between p-2 h-screen w-screen overflow-hidden bg-gray-50">
            {/* Compact Header */}
            <header className="text-center mt-1">
                <h1 className="text-2xl font-bold text-blue-900">Refilling</h1>
                <p className="text-sm text-gray-600">
                    {isFilling ? "Filling your container..." : "Complete!"}
                </p>
            </header>

            {/* Main Animation Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-1">
                {/* Compact Water Bottle */}
                <div className="relative w-24 h-40 border-3 border-blue-300 rounded-b-lg rounded-t-full overflow-hidden bg-blue-50">
                    <div
                        className="absolute bottom-0 w-full bg-blue-400 transition-all duration-300"
                        style={{ height: `${progress}%` }}
                    >
                        <div className="absolute top-0 left-0 right-0 h-2 bg-blue-300 opacity-70 animate-pulse"></div>
                    </div>
                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-blue-200 rounded-full opacity-30"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-4 border-3 border-b-0 border-blue-300 rounded-t-full"></div>
                </div>

                {/* Compact Progress Bar */}
                <div className="w-4/5 mt-2 bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                <p className="text-lg font-bold text-blue-800 mt-1">
                    {Math.round(progress)}%
                </p>
            </div>

            {/* Action Buttons */}
            <div className="mb-2 px-2">
                {isFilling && (
                    <button
                        onClick={handleStop}
                        className="w-full py-2 rounded-lg font-bold text-lg bg-red-600 text-white"
                    >
                        STOP
                    </button>
                )}

                {showSuccess && (
                    <button
                        onClick={() => navigate("/machineui/thankyou")}
                        className="w-full py-2 rounded-lg font-bold text-lg bg-green-600 text-white"
                    >
                        CONTINUE
                    </button>
                )}
            </div>
        </div>
    );
}
