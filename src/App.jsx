import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router";

import { Home_page } from "./pages/page_homepage";
import { Options_page } from "./pages/page_options";
import {Recycle_page} from "./pages/page_recycle";
import {Coin_page} from "./pages/page_coin";
import { Refilling_page } from "./pages/page_refilling";
import { ThankYou_page } from "./pages/page_thankyou";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home_page />} />
        <Route path="/options" element={<Options_page />} />
        <Route path="/recycle" element={<Recycle_page />} />
        <Route path="/coin" element={<Coin_page />} />
        <Route path="/refilling" element={<Refilling_page />} />
        <Route path="/thankyou" element={<ThankYou_page />} />
      </Routes>
    </Router>
  );
}
export default App;
