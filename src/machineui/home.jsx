import { Link, useNavigate } from "react-router-dom";

export function MachineUI_Home() {
  const navigate = useNavigate();

  const handle_navigate = (path) => () => {
    navigate(path);
  };

  return (
    <>
      <div className="grid grid-cols-2 grid-rows-1">
        {/* Branding */}
        <div className="h-fit flex flex-col px-3 self-center gap-3">
          <img
            className="h-auto w-[37dvw] self-center"
            src="/swave-logo.png"
            alt="swave-logo"
          />
          <p className="text-xl text-justify ">
            💦 Stay refreshed and stay hydrated with SWAVE a Smart Vending
            Machine. Get clean water for just a few coins, or insert used
            plastic bottles to earn points🌟. Redeem points for awesome merch
            and every bottle you drop helps the environment too!🌍
          </p>
        </div>
        {/* Options */}
        <div className="h-fit px-3 self-center flex flex-col gap-3">
          <h1 className="text-3xl uppercase text-center font-bold">
            Select Options Below
          </h1>
          <button
            onClick={handle_navigate("/machineui/buywater")}
            className="grid grid-cols-4 grid-rows-1 bg-blue-900 text-3xl font-bold text-white rounded-xl"
          >
            <img
              className="rounded-l-xl"
              src="images/a_glass_of_water.jpeg"
              alt="a-glass-of-water-image"
            />
            <p className="col-span-3 text-4xl text-center self-center">
              Buy Water
            </p>
          </button>
          <button
            onClick={handle_navigate("machineui/recycle")}
            className="grid grid-cols-4 grid-rows-1 bg-blue-900 text-3xl font-bold text-white rounded-xl"
          >
            <img
              className="rounded-l-xl"
              src="images/plastic_bottles.jpeg"
              alt="plastic-bottles"
            />
            <p className="col-span-3 text-4xl text-center self-center">
              Reycle Bottles
            </p>
          </button>
        </div>
      </div>
    </>
  );
}
