import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function MachineUI_BuyWater() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [animate, setAnimate] = useState(false);

  const options = [
    {
      volume: "250ml (8.8oz)",
      price: "₱2",
      volume_value: 250,
      price_volume: 2,
      image: "/water-250ml.png",
    },
    {
      volume: "500ml (17.6oz)",
      price: "₱4",
      volume_value: 500,
      price_volume: 4,
      image: "/water-500ml.png",
    },
    {
      volume: "750ml (26.4oz)",
      price: "₱6",
      volume_value: 750,
      price_volume: 6,
      image: "/water-750ml.png",
    },
    {
      volume: "1000ml (35.2oz)",
      price: "₱11",
      volume_value: 1000,
      price_volume: 11,
      image: "/water-1000ml.png",
    },
  ];

  const handleOrder = () => {
    const selectedOption = options[currentIndex];
    console.log(
      `Ordered: ${selectedOption.volume} for ${selectedOption.price}`
    );
    navigate(-1, {
      state: {
        volume: selectedOption.volume,
        price: selectedOption.price,
        volume_value: selectedOption.volume_value,
        price_value: selectedOption.price_value,
      },
    });
  };

  const goToPrevious = () => {
    setDirection("left");
    setAnimate(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === 0 ? options.length - 1 : prev - 1));
      setAnimate(false);
    }, 300);
  };

  const goToNext = () => {
    setDirection("right");
    setAnimate(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev === options.length - 1 ? 0 : prev + 1));
      setAnimate(false);
    }, 300);
  };

  //   // Auto-rotate carousel every 5 seconds
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       goToNext();
  //     }, 5000);
  //     return () => clearInterval(interval);
  //   }, [currentIndex]);

  return (
    <div className="flex flex-col gap-3">
      <div className="p-2 flex flex-row items-center">
        <img
          className="h-[10dvh] w-auto"
          src="/swave-logo.png"
          alt="swave-logo"
        />
        <h1 className="grow text-center text-4xl">Buy Water</h1>
        <button
          onClick={() => navigate(-1)}
          className="flex flex-row items-center hover:bg-gray-100 p-2 rounded-lg"
        >
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M22 14L16 20L22 26"
              stroke="#2A9D8F"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <p className="font-bold text-xl">Back</p>
        </button>
      </div>

      {/* Animated Carousel */}
      <div className="relative grow flex items-center justify-center p-3 rounded-xl mx-3 bg-blue-800 overflow-hidden">
        <div
          className={`w-full text-center transition-all duration-300 ease-in-out ${
            animate
              ? direction === "right"
                ? "-translate-x-full opacity-0"
                : "translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <div className="flex flex-col items-center gap-6">
            {/* <img
              src={options[currentIndex].image}
              alt={options[currentIndex].volume}
              className=" w-auto object-contain"
            /> */}
            <div>
              <h2 className="text-5xl font-bold text-white">
                {options[currentIndex].volume}
              </h2>
              <p className="text-6xl font-bold text-white">
                {options[currentIndex].price}
              </p>
            </div>
          </div>
        </div>

        {/* Preload next and previous items for smoother transitions */}
        <div className="absolute inset-0 flex items-center justify-center">
          {options.map((option, index) => {
            if (index === currentIndex) return null;
            return (
              <div
                key={index}
                className="absolute w-full text-center opacity-0 pointer-events-none"
              >
                <div className="flex flex-col items-center gap-6">
                  {/* <img
                    src={option.image}
                    alt={option.volume}
                    className="h-64 w-auto object-contain"
                  /> */}
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      {option.volume}
                    </h2>
                    <p className="text-4xl font-bold text-white">
                      {option.price}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex flex-col gap-2 px-2 mb-3">
        <div className="grid grid-cols-2 grid-rows-1 gap-2">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            className="bg-blue-800 text-3xl text-white rounded-xl p-2 hover:bg-blue-700 transition-colors active:scale-95"
          >
            <p className="font-bold">Previous Offer</p>
            <p className="text-sm">
              {
                options[
                  currentIndex === 0 ? options.length - 1 : currentIndex - 1
                ].volume
              }
            </p>
          </button>
          {/* Next Button */}
          <button
            onClick={goToNext}
            className="flex flex-col bg-blue-800 text-3xl text-white rounded-xl p-2 hover:bg-blue-700  transition-colors active:scale-95"
          >
            <p className="font-bold">Next Offer</p>
            <p className="text-sm">
              {
                options[
                  currentIndex === options.length - 1 ? 0 : currentIndex + 1
                ].volume
              }
            </p>
          </button>
        </div>
        <button
          onClick={handleOrder}
          className="bg-green-600 font-bold text-3xl text-white rounded-xl p-2 hover:bg-green-500 transition-colors active:scale-95"
        >
          Confirm Selection
        </button>
      </div>
    </div>
  );
}
