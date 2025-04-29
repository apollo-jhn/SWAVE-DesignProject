import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function Membership_Dashboard() {
    const { code } = useParams()
    const [userData, setUserData] = useState({
        points: 0,
        student_number: "",
        name: "",
        email: ""
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    // Function to fetch user data
    const fetchUserData = async () => {
        try {    
            const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/membership/getdata`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: code }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to fetch user data');
            }

            setUserData({
                points: data.points,
                student_number: data.student_number,
                name: data.name,
                email: data.email
            });
            
            setError("");
        } catch (err) {
            setError(err.message || 'An error occurred while fetching data');
        } finally {
            setIsLoading(false);
        }
    };

    // Set up interval for continuous updates
    useEffect(() => {
        // Initial fetch
        fetchUserData();
        
        // Set up interval for continuous updates every 500ms
        const intervalId = setInterval(fetchUserData, 500);
        
        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, []);

    const handleLogout = () => {
        // Clear any user session data
        localStorage.removeItem('userToken');
        localStorage.removeItem('userCode');
        
        // Redirect to login page
        navigate('/membership/homepage');
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Header */}
            <header className="bg-blue-600 text-white p-4 shadow-md">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold">SWAVE Dashboard</h1>
                    <button 
                        onClick={handleLogout}
                        className="px-4 py-2 bg-white text-blue-600 rounded-md hover:bg-gray-100 transition"
                    >
                        Sign Out
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-grow container mx-auto p-4">
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                ) : error ? (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                        {error}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* User Info Card */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">User Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-gray-500">Name</p>
                                    <p className="text-lg font-medium">{userData.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Email</p>
                                    <p className="text-lg font-medium">{userData.email}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Student Number</p>
                                    <p className="text-lg font-medium">{userData.student_number}</p>
                                </div>
                            </div>
                        </div>

                        {/* Reward Points Card */}
                        <div className="bg-white rounded-lg shadow-md p-6">
                            <h2 className="text-xl font-semibold mb-4 text-gray-800">Reward Points</h2>
                            <div className="flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-5xl font-bold text-blue-600 animate-pulse">
                                        {userData.points}
                                    </p>
                                    <p className="text-gray-500 mt-2">Current Points</p>
                                </div>
                            </div>
                            <div className="mt-6">
                                <button 
                                    className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
                                    onClick={() => alert('DCPERS Facebook Page: DEMO ONLY MODE')}
                                >
                                    Redeem Points
                                </button>
                            </div>
                        </div>

                        {/* Additional dashboard sections can be added here */}
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="bg-red-800 py-4 text-white">
                <div className="container mx-auto px-4 text-center">
                    <p>
                        © {new Date().getFullYear()} SWAVE Vending Machine Prototype. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}