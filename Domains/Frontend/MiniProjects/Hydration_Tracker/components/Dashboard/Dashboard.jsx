import React from "react";
import { TopBar } from "@/components/Dashboard/TopBar";

const Dashboard = ({ children }) => {
    return (
        <div className="bg-blue-950/40 rounded-xl shadow p-4 min-h-screen">
            <TopBar />
            {children}
        </div>
    );
};

export default Dashboard;