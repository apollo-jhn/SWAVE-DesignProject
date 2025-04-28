import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../tools/api_request";

export function MachineUI_Buy_Dispense() {
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [isFilling, setIsFilling] = useState(true);
    const [showSuccess, setShowSuccess] = useState(false);
    const [timeInterval, setTimeInterval] = useState(2000); // Default fallback in ms

    // Constants for animation control
    const ANIMATION_UPDATE_INTERVAL = 200; // ms between progress updates
    const SUCCESS_DISPLAY_DURATION = 2000; // ms before auto-navigate
    const PROGRESS_INCREMENT = 100 / (timeInterval / ANIMATION_UPDATE_INTERVAL);

    // Fetch dispense interval from backend
    useEffect(() => {
        const fetchDispenseInterval = async () => {
            try {
                const response = await postRequest("/data/get", {
                    request: ["dispense_interval"],
                });
                
                if (response.status === "good") {
                    setTimeInterval(response.dispense_interval);
                }
            } catch (error) {
                console.error("Failed to fetch dispense interval:", error);
            }
        };

        fetchDispenseInterval();
    }, []);

    // Handle progress animation
    useEffect(() => {
        let intervalId;

        if (isFilling) {
            intervalId = setInterval(() => {
                setProgress((prevProgress) => {
                    const newProgress = prevProgress + PROGRESS_INCREMENT;
                    
                    if (newProgress >= 100) {
                        clearInterval(intervalId);
                        setIsFilling(false);
                        setShowSuccess(true);
                        return 100;
                    }
                    
                    return newProgress;
                });
            }, ANIMATION_UPDATE_INTERVAL);
        }

        return () => clearInterval(intervalId);
    }, [isFilling, timeInterval]);

    // Handle navigation after success
    useEffect(() => {
        if (!showSuccess) return;

        const successTimer = setTimeout(
            () => navigate("/machineui/thankyou"),
            SUCCESS_DISPLAY_DURATION
        );

        return () => clearTimeout(successTimer);
    }, [showSuccess, navigate]);

    const handleStop = () => {
        setIsFilling(false);
        setShowSuccess(true);
    };

    const handleContinue = () => {
        navigate("/machineui/thankyou");
    };

    return (
        <div className="flex flex-col justify-between p-2 h-screen w-screen overflow-hidden bg-gray-50">
            <header className="text-center mt-1">
                <h1 className="text-2xl font-bold text-blue-900">Refilling</h1>
                <p className="text-sm text-gray-600">
                    {isFilling ? "Filling your container..." : "Complete!"}
                </p>
            </header>

            <div className="flex-1 flex flex-col items-center justify-center p-1">
                {/* Water Bottle Animation */}
                <div className="relative w-24 h-40 border-3 border-blue-300 rounded-b-lg rounded-t-full overflow-hidden bg-blue-50">
                    <div
                        className="absolute bottom-0 w-full bg-blue-400 transition-all duration-300"
                        style={{ height: `${progress}%` }}
                    >
                        <div className="absolute top-0 left-0 right-0 h-2 bg-blue-300 opacity-70 animate-pulse" />
                    </div>
                    <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-16 h-4 bg-blue-200 rounded-full opacity-30" />
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-4 border-3 border-b-0 border-blue-300 rounded-t-full" />
                </div>

                {/* Progress Bar */}
                <div className="w-4/5 mt-2 bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${progress}%` }}
                    />
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
                        onClick={handleContinue}
                        className="w-full py-2 rounded-lg font-bold text-lg bg-green-600 text-white"
                    >
                        CONTINUE
                    </button>
                )}
            </div>
        </div>
    );
}