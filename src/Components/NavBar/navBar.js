import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavBar({ activeState }) {
    const [activeSection, setActiveSection] = useState(null);
    const [showSubMenu, setShowSubMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === "/dashboard") {
            setActiveSection("Dashboard");
            setShowSubMenu(false);
        } else if (currentPath === "/providers" || currentPath === "/providers-req" || currentPath === "/providers-type") {
            setActiveSection(currentPath);
            setShowSubMenu(true);
        }
    }, [location]);

    const menuItems = [
        {
            id: 1,
            name: "Dashboard",
            activeIcon: "/activeDashboard.png",
            inactiveIcon: "/inactiveDashboard.png",
        },
        {
            id: 2,
            name: "Providers",
            activeIcon: "/activeProviders.png",
            inactiveIcon: "/inactiveProviders.png",
        },
    ];

    const subMenuItems = [
        { id: 1, name: "Providers", nav: "providers" },
        { id: 2, name: "Providers Requests", nav: "providers-req" },
        { id: 3, name: "Providers Types", nav: "providers-type" },
    ];

    const handleMainItemClick = (itemName) => {
        if (itemName === "Dashboard") {
            navigate("/dashboard");
        } else if (itemName === "Providers") {
            setShowSubMenu(true);
        }
    };

    const handleSubItemClick = (subItemNav) => {
        navigate(`/${subItemNav}`);
    };

    return (
        <div className="fixed left-0 top-0 bg-white w-60 h-screen flex flex-col">
            <h1 className="text-2xl text-primary font-krona font-bold border-b p-6 mb-5">Karyana</h1>
            {menuItems.map((item) => (
                <div key={item.id} className="my-2">
                    <button
                        onClick={() => handleMainItemClick(item.name)}
                        className={`flex items-center gap-x-2 px-6 py-2 w-full ${item.name === activeSection || 
                            (item.name === "Providers" && ["/providers", "/providers-req", "/providers-type"].includes(activeSection)) ? 
                            'border-l-4 border-primary bg-gray-50' : ''}`}
                    >
                        <img
                            src={item.name === activeSection || 
                                (item.name === "Providers" && ["/providers", "/providers-req", "/providers-type"].includes(activeSection)) ? 
                                item.activeIcon : item.inactiveIcon}
                            alt={item.name}
                        />
                        <span>{item.name}</span>
                    </button>
                    {item.name === "Providers" && showSubMenu && (
                        <div className="py-2 space-y-2 pl-4">
                            {subMenuItems.map((subItem) => (
                                <button
                                    key={subItem.id}
                                    onClick={() => handleSubItemClick(subItem.nav)}
                                    className={`flex items-center gap-x-2 px-6 py-2 w-full ${`/${subItem.nav}` === activeSection ? 'border-l-4 border-primary bg-gray-50' : ''}`}
                                >
                                    <p className="font-bold"> &gt; <span className="font-normal ml-1">{subItem.name}</span></p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
