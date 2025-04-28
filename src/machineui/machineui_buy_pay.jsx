import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../tools/api_request";

export function MachineUI_Buy_Pay() {
    const [selectedOffer, setData] = useState({ volume: "", price: "" });
    const [insertedAmount, setInsertedAmount] = useState(0);
    const navigate = useNavigate();

    // Fetch selected offer on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const requestData = { request: ["volume", "price"] };
                const _data = await postRequest("/data/get", requestData);
                setData(_data);
            } catch (error) {
                console.error("Failed to fetch offer:", error);
            }
        };
        fetchData();
    }, []);

    // Poll for inserted coins
    useEffect(() => {
        const fetchInsertedAmount = async () => {
            try {
                const _requestData = { request: ["inserted_amount"] };
                const _data = await postRequest("/data/get", _requestData);
                setInsertedAmount(_data.inserted_amount);
            } catch (error) {
                console.error("Failed to fetch inserted amount:", error);
            }
        };

        const interval = setInterval(fetchInsertedAmount, 375);
        return () => clearInterval(interval);
    }, []);

    const priceValue = parseInt(selectedOffer.price.replace("₱", ""), 10);
    const remainingAmount = priceValue - insertedAmount;
    const isPaymentComplete = insertedAmount >= priceValue;

    const handleRefill = async () => {
        try {
            const _calling_function = { function: ["dispense_water"] };
            const _data = await postRequest("/function/call", _calling_function);
            
            if (_data.status === "success") {
                navigate("/machineui/buy/dispense");
            }
        } catch (error) {
            console.error("Failed to call dispense water function:", error);
        }
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
                <p className="text-5xl font-bold text-white my-2">
                    ₱{insertedAmount}
                </p>
                <p className="text-xl text-blue-200">
                    {remainingAmount > 0
                        ? `Remaining: ₱${remainingAmount}`
                        : "Payment received"}
                </p>
            </div>

            {/* Selected Offer Section */}
            <div className="bg-blue-100 text-black rounded-lg p-4 mb-4">
                <h2 className="text-xl font-bold uppercase mb-2">
                    Your Selection
                </h2>
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
                    isPaymentComplete
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-gray-400 cursor-not-allowed"
                } text-white`}
                onClick={handleRefill}
                disabled={!isPaymentComplete}
            >
                {isPaymentComplete ? "Confirm Refill" : "Insufficient Funds"}
            </button>
        </div>
    );
}