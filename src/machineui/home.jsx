import { useNavigate } from "react-router-dom";

export function MachineUI_Home() {
  const navigate = useNavigate();

  const handle_navigate = (path) => () => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 bg-blue-50">
      <div className="bg-white shadow-2xl rounded-3xl p-6 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Branding */}
        <div className="flex flex-col items-center gap-6 text-center md:text-left md:items-start">
          <img
            className="w-[60%] md:w-[40%] h-auto"
            src="/swave-logo.png"
            alt="swave-logo"
          />
          <p className="text-lg leading-relaxed text-gray-700">
            💦 Stay refreshed and hydrated with <strong>SWAVE</strong>, a Smart
            Vending Machine. Get clean water for just a few coins, or insert
            used plastic bottles to earn points 🌟. Redeem points for awesome
            merch— every bottle you drop helps the environment too! 🌍
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col justify-center gap-6">
          <h1 className="text-3xl font-bold uppercase text-center text-blue-900">
            Select Options Below
          </h1>

          <button
            onClick={handle_navigate("/machineui/buywater")}
            className="grid grid-cols-4 items-center bg-blue-800 rounded-2xl overflow-hidden shadow-md hover:bg-blue-700 transition-colors"
          >
            <img
              className="h-full object-cover"
              src="/images/a_glass_of_water.jpeg"
              alt="a-glass-of-water-image"
            />
            <p className="col-span-3 text-3xl text-white font-bold text-center">
              Buy Water
            </p>
          </button>

          <button
            onClick={handle_navigate("/machineui/recycle")}
            className="grid grid-cols-4 items-center bg-blue-800 rounded-2xl overflow-hidden shadow-md hover:bg-blue-700 transition-colors"
          >
            <img
              className="h-full object-cover"
              src="/images/plastic_bottles.jpeg"
              alt="plastic-bottles"
            />
            <p className="col-span-3 text-3xl text-white font-bold text-center">
              Recycle Bottles
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
