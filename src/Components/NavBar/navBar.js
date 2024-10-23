import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
    const [activeSection, setActiveSection] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedActiveSection = sessionStorage.getItem('activeSection');
        if (storedActiveSection) {
            setActiveSection(storedActiveSection);
        } else {
            setActiveSection("dashboard");
        }
    }, []);
    useEffect(() => {
        if (activeSection) {
            sessionStorage.setItem('activeSection', activeSection);
        }
    }, [activeSection]);

    function handleDashboard() {
        setActiveSection("dashboard");
        navigate("/dashboard");
    }

    function handleProviders() {
        setActiveSection("providers");
    }

    function handleSubProviders() {
        setActiveSection("subProviders");
        navigate("/providers");
    }

    function handleProvidersReq() {
        setActiveSection("providersReq");
        navigate("/providers-req");
    }

    function handleProvidersType() {
        setActiveSection("providersType");
        navigate("/providers-type");
    }

    return (
        <div className="fixed left-0 top-0 bg-white w-60 h-screen flex flex-col ">
            <h1 className="text-2xl text-primary font-krona font-bold border-b p-6">Karyana</h1>
            <div className="py-5 space-y-4">
                <div>
                    <button
                        onClick={handleDashboard}
                        className={`flex items-center gap-x-2 px-6 py-2 w-full ${activeSection === "dashboard" ? 'border-l-4 border-primary bg-gray-50' : ''}`}
                    >
                        {activeSection === "dashboard" ? (
                            <img src="/activeDashboard.png" alt="dashboard" />
                        ) : (
                            <img src="/inactiveDashboard.png" alt="dashboard" />
                        )}
                        <span>Dashboard</span>
                    </button>
                </div>

                <div>
                    <button
                        onClick={handleProviders}
                        className={`flex items-center gap-x-2 px-6 py-2 w-full ${activeSection === "providers" ? 'border-l-4 border-primary bg-gray-50' : ''}`}
                    >
                        {activeSection === "providers" ? (
                            <img src="/activeProviders.png" alt="Providers" />
                        ) : (
                            <img src="/inactiveProviders.png" alt="Providers" />
                        )}
                        <span>Providers</span>
                    </button>
                </div>

                {activeSection === "providers" && (
                    <div className="">
                        <div className="">
                            <button
                                onClick={handleSubProviders}
                                className={`flex items-center gap-x-2 px-6 py-2 w-full ${activeSection === "subProviders" ? 'border-l-4 border-primary bg-gray-50' : ''}`}
                            >
                                <p className="font-bold"> &gt; <span className="font-normal ml-1">Providers</span></p>
                            </button>
                        </div>
                        <div className="">
                            <button
                                onClick={handleProvidersReq}
                                className={`flex items-center gap-x-2 px-6 py-2 w-full ${activeSection === "providersReq" ? 'border-l-4 border-primary bg-gray-50' : ''}`}
                            >
                                <p className="font-bold"> &gt; <span className="font-normal ml-1">Providers Requests</span></p>
                            </button>
                        </div>
                        <div className="">
                            <button
                                onClick={handleProvidersType}
                                className={`flex items-center gap-x-2 px-6 py-2 w-full ${activeSection === "providersType" ? 'border-l-4 border-primary bg-gray-50' : ''}`}
                            >
                                <p className="font-bold"> &gt; <span className="font-normal ml-1">Providers Types</span></p>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
