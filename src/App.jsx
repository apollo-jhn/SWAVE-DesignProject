import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router";

import { Layout } from "./layout";
import { Buywater } from "./pages/page_buywater";
import { Homepage } from "./pages/page_homepage";
import { Recyclebottle } from "./pages/page_recyclebottle";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Homepage />} />
          <Route path="/buywater" element={<Buywater />} />
          <Route path="/recyclebottle" element={<Recyclebottle />} />        </Route>
      </Routes>
    </Router>
  );
}
export default App;
