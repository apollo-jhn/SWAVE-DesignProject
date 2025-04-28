import React from "react";
import { Link } from "react-router-dom";

export function Membership_Homepage() {
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
                        Welcome to the student portal
                    </p>
                </div>

                {/* Login Form */}
                <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
                    <form className="space-y-6">
                        {/* Email/Username Field */}
                        <div>
                            <label
                                htmlFor="account_credentials"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                4-Digit Code/Student Number/Email
                            </label>
                            <input
                                type="text"
                                id="account_credentials"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="delacruz.juan@dfcamclp.edu.ph"
                                required
                            />
                        </div>

                        {/* Password Field */}
                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label
                                    htmlFor="remember-me"
                                    className="ml-2 block text-sm text-gray-700"
                                >
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <Link
                                    to="/forgot-password"
                                    className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                        >
                            Sign in
                        </button>
                    </form>

                    {/* Sign Up Link */}
                    <div className="mt-6 text-center text-sm">
                        <span className="text-gray-600">
                            Don't have an account?{" "}
                        </span>
                        <Link
                            to="/register"
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Sign up
                        </Link>
                    </div>
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
