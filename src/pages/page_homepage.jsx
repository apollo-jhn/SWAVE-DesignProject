import React from "react";
import { Link } from "react-router-dom";

export function Homepage() {
  return (
    <div className="grid grid-cols-3 grid-rows-1 p-3 gap-3">
      {/* Left Panel Text */}
      <div className=" flex flex-col justify-center">
        <div className="flex flex-col">
          {/* Title */}
          <h2 className="text-center text-5xl mb-2 font-bold">SWAVE</h2>
          {/* Description */}
          <p className="text-justify mb-2">
            Stay refreshed and stay hydrated with the DFCAM Satellite School
            Water Vending Machine! Get clean water for just a few coins, or
            insert used plastic bottles to earn points. Redeem points for
            awesome merch and every bottle you drop helps the environment too!
          </p>
          <p className="text-center font-bold">
            Drink. Earn. Enjoy. Make a difference!
          </p>
        </div>
      </div>
      {/* Right Panel | Choose Offer */}
      <div className="col-span-2 grid grid-cols-2 grid-rows-1 gap-2">
        {/* Buy Water */}
        <Link to={"/buywater"} className="block">
          <div className="bg-white text-black rounded-xl h-full">
            <img
              src="assets/images/a_glass_of_water.jpeg"
              className="rounded-t-xl"
              alt="buy_water"
            />
            <div className="flex flex-col justify-between p-2">
              <h2 className="text-xl uppercase font-bold text-center">
                Buy Water
              </h2>
              <p className="">
                Buy drinkable water at an affordable price 💰 — refreshing 💦 to
                stay hydrated 💧
              </p>
            </div>
          </div>
        </Link>

        {/* Recycle Plastic Bottle */}
        <Link to={"/recycle"} className="block">
          <div className="bg-white backdrop-blur-xl  text-black rounded-xl h-full">
            <img
              src="assets/images/plastic_bottles.jpeg"
              className="rounded-t-xl"
              alt="recycle_pet"
            />
            <div className="flex flex-col justify-between p-2">
              <h2 className="text-xl uppercase font-bold text-center">
                Recycle PET
              </h2>
              <p className="">
                Deposit a recyclable plastic bottle to receive drinkable water
                as a reward — or simply contribute to recycling 🌍💧
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
