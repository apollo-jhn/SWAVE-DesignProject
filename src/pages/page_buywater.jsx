import React, { useState } from "react";

export function Buywater() {
  const [selectedSize, setSelectedSize] = useState(null);
  const [orderLocked, setOrderLocked] = useState(false);

  const sizes = [
    { label: "350ml", value: "350", price: "₱XX" }, // Replace XX with actual price
    { label: "500ml", value: "500", price: "₱YY" }, // Replace YY with actual price
    { label: "750ml", value: "750", price: "₱ZZ" }, // Replace ZZ with actual price
    { label: "1000ml", value: "1000", price: "₱AA" }, // Replace AA with actual price
  ];

  const handleSizeSelect = (value) => {
    if (!orderLocked) {
      setSelectedSize(value);
    }
  };

  const handleLockOrder = () => {
    if (selectedSize) {
      setOrderLocked(true);
      console.log(`Order locked for ${selectedSize}ml`);
      // You can perform further actions here, like sending the order data
    } else {
      alert("Please select a size before locking the order.");
    }
  };

  return (
    <div className="grid grid-cols-3 grid-rows-1">
      {/* Choices */}
      <div className="col-span-2 flex flex-col gap-3 p-3">
        <h3 className="text-center text-3xl uppercase font-bold">
          Select Offer
        </h3>
        <div className="grow grid grid-cols-2 grid-rows-2 gap-3">
          {sizes.map((size) => (
            <div
              key={size.value}
              className={`rounded-xl flex flex-col justify-center text-center cursor-pointer p-4 ${
                selectedSize === size.value
                  ? "bg-blue-700 text-white border-4 border-blue-500 shadow-md"
                  : "bg-blue-900 text-gray-200 shadow-sm hover:shadow-md transition duration-200"
              } ${orderLocked ? "cursor-default" : ""}`}
              onClick={() => handleSizeSelect(size.value)}
              role="radio"
              aria-checked={selectedSize === size.value}
              aria-label={size.label}
              tabIndex={0}
              onKeyDown={(event) => {
                if (
                  !orderLocked &&
                  (event.key === "Enter" || event.key === " ")
                ) {
                  handleSizeSelect(size.value);
                }
              }}
            >
              <p className="text-xl">{size.label}</p>
              <p className="font-bold text-3xl">
                {size.price}
              </p>
            </div>
          ))}
        </div>
        {/* Confirm */}
        <button
          className={`bg-green-600 font-bold rounded-xl p-3 ${
            selectedSize
              ? "opacity-100 hover:bg-green-700 transition duration-200"
              : "opacity-50 cursor-not-allowed"
          }`}
          onClick={handleLockOrder}
          disabled={!selectedSize}
        >
          {orderLocked ? "Order Locked" : "Lock Order"}
        </button>
      </div>
      {/* Panel */}
      <div className={`flex flex-col justify-center items-center`}>
        <h1 className="font-bold text-3xl uppercase">Price to Pay</h1>
        <h1 className="font-bold text-4xl uppercase">{sizes.find((s) => s.value === selectedSize)?.price}</h1>
      </div>
      {/* 
        class =  ${
          orderLocked ? "opacity-100" : "opacity-70"
        }

        <h4 className="text-2xl font-bold mb-4">Order Summary</h4>
        {selectedSize ? (
          <div>
            <p className="text-lg">
              Selected Size:{" "}
              {sizes.find((s) => s.value === selectedSize)?.label}
            </p>
            <p className="text-lg">
              Price: {sizes.find((s) => s.value === selectedSize)?.price}
            </p>
            {orderLocked && (
              <p className="text-green-500 font-bold">Order is locked!</p>
            )}
          </div>
        ) : (
          <p className="text-gray-500">Select an offer to see the summary.</p>
        )} */}
    </div>
  );
}
