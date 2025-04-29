import React from "react";
import { Link } from "react-router-dom";

export function Membership_UnderConstruction() {
    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            {/* Main Content */}
            <div className="flex-grow flex flex-col items-center justify-center p-4">
                {/* Title Container */}
                <div className="text-center mb-10">
                    <h1 className="text-5xl font-bold text-blue-600 mb-2">
                        SWAVE
                    </h1>
                    <p className="text-gray-600">
                        We're working on something awesome!
                    </p>
                </div>

                {/* Construction Content */}
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="mb-6">
                        <svg 
                            className="w-20 h-20 mx-auto text-yellow-500" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24" 
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M13 10V3L4 14h7v7l9-11h-7z" 
                            />
                        </svg>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Page Under Construction
                    </h2>
                    <p className="text-gray-600 mb-6">
                        We're working hard to bring you this feature soon. 
                        Please check back later!
                    </p>

                    {/* Back to Home Button */}
                    <Link
                        to="/membership/homepage"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-red-800 py-4">
                <div className="container mx-auto px-4 text-center text-white">
                    <p>
                        © {new Date().getFullYear()} SWAVE Vending Machine
                        Prototype. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}