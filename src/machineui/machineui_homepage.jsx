import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getRequest } from "../tools/api_request";

// Constants
const MODES = [
  {
    title: "Buy Water",
    path: "/machineui/buy/option",
    image: "assets/images/a_glass_of_water.jpeg",
    alt: "Glass of water",
  },
  {
    title: "Recycle Plastic Bottle",
    path: "/machineui/recycle/bottle",
    image: "assets/images/plastic_bottles.jpeg",
    alt: "Plastic bottles",
  },
];

const ConnectionStatus = {
  LOADING: "loading",
  AVAILABLE: "available",
  UNAVAILABLE: "unavailable",
};

// Components
const LoadingScreen = () => (
  <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50">
    <div className="text-center">
      <h1 className="text-5xl font-bold text-blue-900 mb-4">SWAVE</h1>
      <p className="text-xl text-gray-700">Checking connection to the machine...</p>
    </div>
  </div>
);

const ConnectionWarning = () => (
  <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4">
    <p className="font-bold">Warning</p>
    <p>The machine is currently unavailable. Please try again later.</p>
  </div>
);

const ModeCard = ({ mode, isEnabled }) => (
  <div
    className={`transition-transform ${
      isEnabled ? "hover:scale-[1.02] focus:scale-[1.02]" : "opacity-70 cursor-not-allowed"
    }`}
    aria-label={isEnabled ? `Go to ${mode.title}` : `${mode.title} - Machine unavailable`}
  >
    <div className="bg-blue-900 rounded-xl overflow-hidden shadow-lg grid grid-cols-3 h-full">
      <img
        className={`w-full h-full object-cover ${!isEnabled && "opacity-80"}`}
        src={mode.image}
        alt={mode.alt}
        loading="lazy"
      />
      <div className="col-span-2 p-4 flex items-center justify-center">
        <p className="text-2xl md:text-3xl font-bold text-white text-center">{mode.title}</p>
      </div>
    </div>
  </div>
);

const BrandSection = ({ isBackendAvailable }) => (
  <div className="flex flex-col space-y-6">
    <h1 className="text-5xl md:text-6xl font-bold text-center text-blue-900">SWAVE</h1>
    <div className="space-y-4">
      <p className="text-lg text-gray-700">
        💦 Stay refreshed and stay hydrated with SWAVE for DFCAM IT Campus students. Get clean
        water for just a few coins, or insert used plastic bottles to earn points🌟. Redeem points
        for awesome merch and every bottle you drop helps the environment too!🌍
      </p>
      {!isBackendAvailable && <ConnectionWarning />}
      <p className="text-xl md:text-2xl text-center font-semibold text-blue-800">
        Drink. Earn. Enjoy. Make a difference! 🫧🌏
      </p>
    </div>
  </div>
);

const ModeSelectionSection = ({ modes, isBackendAvailable }) => (
  <div className="flex flex-col space-y-6">
    <h2 className="text-3xl uppercase font-bold text-center text-gray-800">Select mode</h2>
    <div className="grid grid-cols-1 gap-4">
      {modes.map((mode) => (
        <div key={mode.path}>
          {isBackendAvailable ? (
            <Link to={mode.path}>
              <ModeCard mode={mode} isEnabled={true} />
            </Link>
          ) : (
            <ModeCard mode={mode} isEnabled={false} />
          )}
        </div>
      ))}
    </div>
    {!isBackendAvailable && (
      <p className="text-center text-red-600 font-medium">
        Please ensure the machine is connected and try again.
      </p>
    )}
  </div>
);

// Main Component
export function MachineUI_Homepage() {
  const [connectionStatus, setConnectionStatus] = useState(ConnectionStatus.LOADING);

  useEffect(() => {
    const checkBackendConnection = async () => {
      try {
        const data = await getRequest("/ping");
        setConnectionStatus(
          data.status === "success" ? ConnectionStatus.AVAILABLE : ConnectionStatus.UNAVAILABLE
        );
      } catch (error) {
        console.error("Backend connection failed:", error);
        setConnectionStatus(ConnectionStatus.UNAVAILABLE);
      }
    };

    checkBackendConnection();
  }, []);

  if (connectionStatus === ConnectionStatus.LOADING) {
    return <LoadingScreen />;
  }

  const isBackendAvailable = connectionStatus === ConnectionStatus.AVAILABLE;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 bg-gray-50">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <BrandSection isBackendAvailable={isBackendAvailable} />
        <ModeSelectionSection modes={MODES} isBackendAvailable={isBackendAvailable} />
      </div>
    </div>
  );
}