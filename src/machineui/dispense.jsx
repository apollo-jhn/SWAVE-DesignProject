import axios from "axios";
import { LiquidFillAnimation } from "../components/liquid_fill_animation";
import { useLocation, useNavigate } from "react-router-dom";

export function MachineUI_Dispense() {
  const navigation = useNavigate();
  const location = useLocation();
  const { dispensing_interval } = location.state || {};

  const dispense_complete = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_BASE_URL + "/buywater/stop/dispensing"
      );

      if (response.status == 200) {
        navigation("/machineui/thankyou", {
          state: {
            message: "Refill complete. Thanks for using our vending machine!",
          },
        });
      }
    } catch (error) {
      console.error("dispense.jsx | CRITICAL", error);
    }
  };
  return (
    <div className="flex flex-col justify-center">
      <LiquidFillAnimation
        duration={dispensing_interval}
        onComplete={dispense_complete}
        showTimeRemaining={true}
        containerClassName="my-custom-class"
      />
    </div>
  );
}
