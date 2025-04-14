import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router";

import { Layout } from "./layout";
import { Homepage } from "./pages/page_homepage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout/>}>
          <Route path="/" element={<Homepage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
