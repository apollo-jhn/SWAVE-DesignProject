import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../tools/api_request";

export function MachineUI_Buy_Option() {
    const [selectedOption, setSelectedOption] = useState(null);
    const [isLocked, setIsLocked] = useState(false);
    const navigate = useNavigate();

    const volumeOptions = [
        { size: "250ml", price: "₱2" },
        { size: "500ml", price: "₱4" },
        { size: "750ml", price: "₱6" },
        { size: "1000ml", price: "₱11" },
    ];

    const handleOptionClick = (index) => {
        if (!isLocked) {
            setSelectedOption(selectedOption === index ? null : index);
        }
    };

    const toggleLockOption = () => {
        setIsLocked(!isLocked);
    };

    const handleProceed = async () => {
        if (selectedOption === null) return;

        try {
            const response = await postRequest("/data/put", {
                volume: volumeOptions[selectedOption].size,
                price: volumeOptions[selectedOption].price,
            });

            if (response.status === "success") {
                navigate("/machineui/buy/pay");
            }
        } catch (error) {
            console.error("Transaction failed:", error);
        }
    };

    const handleBack = () => navigate(-1);

    const BackButton = () => (
        <button
            onClick={handleBack}
            className="absolute top-4 left-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg z-10"
            aria-label="Go back"
        >
            ← Back
        </button>
    );

    const Header = () => (
        <header className="text-center mb-2 mt-2">
            <h1 className="text-3xl font-bold text-blue-900">Select Water Volume</h1>
            <p className="text-lg text-gray-600">Choose your preferred size</p>
        </header>
    );

    const VolumeButtons = () => (
        <div className="grid grid-cols-2 gap-3 flex-1 min-h-0">
            {volumeOptions.map((option, index) => {
                const isSelected = selectedOption === index;
                const buttonClasses = [
                    "rounded-lg p-2 flex flex-col items-center justify-center transition-all",
                    isSelected 
                        ? isLocked ? "bg-blue-700" : "bg-blue-600"
                        : isLocked ? "bg-blue-900 opacity-70" : "bg-blue-900 hover:bg-blue-800",
                    isLocked ? "cursor-not-allowed" : "cursor-pointer"
                ].join(" ");

                return (
                    <button
                        key={option.size}
                        className={buttonClasses}
                        onClick={() => handleOptionClick(index)}
                        disabled={isLocked}
                    >
                        <p className="text-white font-bold text-4xl">{option.size}</p>
                        <p className="text-white text-3xl">{option.price}</p>
                    </button>
                );
            })}
        </div>
    );

    const ActionButtons = () => {
        const lockButtonClasses = [
            "w-full py-3 rounded-lg font-bold text-xl text-white",
            selectedOption !== null
                ? isLocked ? "bg-yellow-600 hover:bg-yellow-700" 
                           : "bg-green-600 hover:bg-green-700"
                : "bg-gray-400 cursor-not-allowed"
        ].join(" ");

        const proceedButtonClasses = [
            "w-full py-3 rounded-lg font-bold text-xl text-white",
            isLocked ? "bg-purple-600 hover:bg-purple-700" 
                     : "bg-gray-400 cursor-not-allowed"
        ].join(" ");

        return (
            <div className="flex flex-col gap-3 mt-3">
                <button
                    className={lockButtonClasses}
                    onClick={toggleLockOption}
                    disabled={selectedOption === null}
                >
                    {isLocked ? "Unlock" : "Lock Selection"}
                </button>

                <button
                    className={proceedButtonClasses}
                    onClick={handleProceed}
                    disabled={!isLocked}
                >
                    Proceed
                </button>
            </div>
        );
    };

    return (
        <div className="flex flex-col justify-between p-4 bg-gray-50 overflow-hidden relative">
            <BackButton />
            <Header />
            <VolumeButtons />
            <ActionButtons />
        </div>
    );
}