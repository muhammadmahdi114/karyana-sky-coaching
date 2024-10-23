import React, { useState } from "react";
import Dashboard from "../Dashboard/dashboard";
import Providers from "../Providers/providers";
import ProvidersReq from "../ProvidersReq/providersReq";
import ProvidersTypes from "../ProvidersType/providersType";

export default function Home() {
    const [activeSection, setActiveSection] = useState("Dashboard");

    const renderActiveSection = () => {
        switch (activeSection) {
            case "Dashboard":
                return <Dashboard />;
            case "Providers":
                return <Providers />;
            case "Providers Requests":
                return <ProvidersReq />
            case "Providers Types":
                return <ProvidersTypes />;
            default:
                return null;
        }
    };

    return (
        <div className="flex">
            <NavBar setActiveSection={setActiveSection} />
            <div className="flex-grow p-8">
                {renderActiveSection()}
            </div>
        </div>
    );
}
