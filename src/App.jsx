import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router";

import { Home_page } from "./machineui/page_homepage";
import { Options_page } from "./machineui/page_options";
import { Recycle_page } from "./machineui/page_recycle";
import { Coin_page } from "./machineui/page_coin";
import { Refilling_page } from "./machineui/page_refilling";
import { ThankYou_page } from "./machineui/page_thankyou";
import { Redeem_page } from "./machineui/page_redeem";
import { Homepage } from "./membership/homepage";
import { RegisterPage } from "./membership/register";

function App() {
  return (
    <Router>
      <Routes>
        {/* Homepage */}
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Machine UI */}
        <Route path="/machineui/" element={<Home_page />} />
        <Route path="/machineui/options" element={<Options_page />} />
        <Route path="/machineui/recycle" element={<Recycle_page />} />
        <Route path="/machineui/coin" element={<Coin_page />} />
        <Route path="/machineui/refilling" element={<Refilling_page />} />
        <Route path="/machineui/thankyou" element={<ThankYou_page />} />
        <Route path="/machineui/redeem" element={<Redeem_page />} />
      </Routes>
    </Router>
  );
}
export default App;
