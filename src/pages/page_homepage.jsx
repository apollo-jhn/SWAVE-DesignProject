import React from "react";
import { Link } from "react-router-dom";

const MODES = [
  {
    title: "Buy Water",
    path: "/options",
    image: "assets/images/a_glass_of_water.jpeg",
    alt: "Glass of water"
  },
  {
    title: "Recycle Plastic Bottle",
    path: "/recycle",
    image: "assets/images/plastic_bottles.jpeg",
    alt: "Plastic bottles"
  }
];

export function Home_page() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Brand Section */}
        <div className="flex flex-col space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold text-center text-blue-900">SWAVE</h1>
          <div className="space-y-4">
            <p className="text-lg text-gray-700">
              💦 Stay refreshed and stay hydrated with SWAVE for DFCAM IT Campus
              students. Get clean water for just a few coins, or insert used
              plastic bottles to earn points🌟. Redeem points for awesome merch
              and every bottle you drop helps the environment too!🌍
            </p>
            <p className="text-xl md:text-2xl text-center font-semibold text-blue-800">
              Drink. Earn. Enjoy. Make a difference! 🫧🌏
            </p>
          </div>
        </div>

        {/* Mode Selection */}
        <div className="flex flex-col space-y-6">
          <h2 className="text-3xl uppercase font-bold text-center text-gray-800">
            Select mode
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {MODES.map((mode) => (
              <Link 
                key={mode.path}
                to={mode.path}
                className="block transition-transform hover:scale-[1.02] focus:scale-[1.02]"
                aria-label={`Go to ${mode.title}`}
              >
                <div className="bg-blue-900 rounded-xl overflow-hidden shadow-lg grid grid-cols-3 h-full">
                  <img
                    className="w-full h-full object-cover"
                    src={mode.image}
                    alt={mode.alt}
                    loading="lazy"
                  />
                  <div className="col-span-2 p-4 flex items-center justify-center">
                    <p className="text-2xl md:text-3xl font-bold text-white text-center">
                      {mode.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}