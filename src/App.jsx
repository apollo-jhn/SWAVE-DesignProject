import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router";
import { MachineUI_Homepage } from "./machineui/machineui_homepage";
import { MachineUI_Buy_Option } from "./machineui/machineui_buy_option";
import { MachineUI_Buy_Pay } from "./machineui/machineui_buy_pay";
import { MachineUI_Buy_Dispense } from "./machineui/machineui_buy_dispense";
import { MachineUI_Thankyou } from "./machineui/machineui_thankyou";
import { MachineUI_Recycle_Bottles } from "./machineui/machineui_recycle_bottles";
import { MachineUI_Recycle_Redeem } from "./machineui/machineui_recycle_redeem";
import { Membership_Homepage } from "./membership/membership_homepage";
import { Membership_Register } from "./membership/membership_register";
import { Membership_UnderConstruction } from "./membership/membership_undercontruction";
import { Membership_Dashboard} from "./membership/membership_dashboard";

function App() {
    return (
        <Router>
            <Routes>
                {/* Vending Machine User Interface */}
                <Route path="/machineui" element={<MachineUI_Homepage />} />
                <Route path="/machineui/buy/option" element={<MachineUI_Buy_Option />} />
                <Route path="/machineui/buy/pay" element={<MachineUI_Buy_Pay />} />
                <Route path="/machineui/buy/dispense" element={<MachineUI_Buy_Dispense />} />
                <Route path="/machineui/recycle/bottle" element={<MachineUI_Recycle_Bottles />} />
                <Route path="/machineui/recycle/redeem" element={<MachineUI_Recycle_Redeem />} />
                <Route path="/machineui/thankyou" element={<MachineUI_Thankyou />} />
                {/* Membership */}
                <Route path="/membership/homepage" element={<Membership_Homepage />} />
                <Route path="/membership/register" element={<Membership_Register />} />
                <Route path="/membership/dashboard/:code" element={<Membership_Dashboard />} />
                <Route path="/membership/forgot-password" element={<Membership_UnderConstruction />} />
            </Routes>
        </Router>
    );
}

export default App;
