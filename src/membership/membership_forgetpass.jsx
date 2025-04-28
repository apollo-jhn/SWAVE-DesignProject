import React from "react";
import { Link } from "react-router-dom";

export function Membership_ForgetPassword() {
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
                        Reset your password
                    </p>
                </div>

                {/* Password Reset Form */}
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                    <form className="space-y-6">
                        <div className="text-center mb-4">
                            <p className="text-gray-600">
                                Enter your email address and we'll send you a link to reset your password.
                            </p>
                        </div>

                        {/* Email Field */}
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="your.email@dfcamclp.edu.ph"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Send Reset Link
                        </button>

                        {/* Back to Login Link */}
                        <div className="text-center text-sm">
                            <Link
                                to="/login"
                                className="font-medium text-blue-600 hover:text-blue-500"
                            >
                                ← Back to login
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-red-800 py-4">
                <div className="container mx-auto px-4 text-center text-white">
                    <p>
                        © {new Date().getFullYear()} SWAVE Student Portal. All
                        rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}