import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
    const [activeSection, setActiveSection] = useState(null);
    const [provShowSubMenu, setProvShowSubMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;

        if (currentPath === "/dashboard") {
            setActiveSection("Dashboard");
            setProvShowSubMenu(false);
        } else if (currentPath === "/categories") {
            setActiveSection("Categories");
            setProvShowSubMenu(false);
        } else if (["/providers", "/providers-req", "/providers-type"].includes(currentPath)) {
            setActiveSection("Providers");
            setProvShowSubMenu(true);
        } else if (currentPath === "/services") {
            setActiveSection("Services");
            setProvShowSubMenu(false);
        } else if (currentPath === "/coupons") {
            setActiveSection("Coupons");
            setProvShowSubMenu(false);
        } else if (currentPath === "/faqs") {
            setActiveSection("FAQs");
            setProvShowSubMenu(false);
        } else if (currentPath === "/privacy-policy") {
            setActiveSection("Privacy Policy");
            setProvShowSubMenu(false);
        } else if (currentPath === "/terms-and-conditions") {
            setActiveSection("Terms and Conditions");
            setProvShowSubMenu(false);
        }
        else if (currentPath === "/about-us") {
            setActiveSection("About Us");
            setProvShowSubMenu(false);
        }
    }, [location]);

    const menuItems = [
        {
            id: 1,
            name: "Dashboard",
            activeIcon: "/activeDashboard.svg",
            inactiveIcon: "/inactiveDashboard.svg",
        },
        {
            id: 2,
            name: "Providers",
            activeIcon: "/activeProviders.svg",
            inactiveIcon: "/inactiveProviders.svg",
        },
        {
            id: 3,
            name: "Categories",
            activeIcon: "/activeCategories.svg",
            inactiveIcon: "/inactiveCategories.svg",
        },
        {
            id: 4,
            name: "Services",
            activeIcon: "/activeServices.svg",
            inactiveIcon: "/inactiveServices.svg",
        },
        {
            id: 5,
            name: "Coupons",
            activeIcon: "/activeCoupons.svg",
            inactiveIcon: "/inactiveCoupons.svg",
        },
        {
            id: 6,
            name: "FAQs",
            activeIcon: "/activeFAQ.svg",
            inactiveIcon: "/inactiveFAQ.svg",
        },
        {
            id: 7,
            name: "Privacy Policy",
            activeIcon: "/activeDoc.svg",
            inactiveIcon: "/inactiveDoc.svg",
        },
        {
            id: 8,
            name: "Terms and Conditions",
            activeIcon: "/activeDoc.svg",
            inactiveIcon: "/inactiveDoc.svg",
        },
        {
            id: 9,
            name: "About Us",
            activeIcon: "/activeDoc.svg",
            inactiveIcon: "/inactiveDoc.svg",
        },
    ];

    const provSubMenuItems = [
        { id: 1, name: "Providers", nav: "providers" },
        { id: 2, name: "Providers Requests", nav: "providers-req" },
        { id: 3, name: "Providers Types", nav: "providers-type" },
    ];

    const handleMainItemClick = (itemName) => {
        setActiveSection(itemName);
        if (itemName === "Providers") {
            setProvShowSubMenu(true);
        } else {
            setProvShowSubMenu(false);

            const formattedRoute = itemName.toLowerCase().replace(/ /g, "-");
            navigate(`/${formattedRoute}`);
        }
    };

    const handleSubItemClick = (subItemNav) => {
        setActiveSection("Providers");
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
                            (item.name === "Providers" && provShowSubMenu)
                            ? "border-l-4 border-primary bg-gray-50"
                            : ""
                        }`}
                    >
                        <img
                            src={
                                item.name === activeSection ||
                                (item.name === "Providers" && provShowSubMenu)
                                    ? item.activeIcon
                                    : item.inactiveIcon
                            }
                            alt={item.name}
                        />
                        <span>{item.name}</span>
                    </button>

                    {item.name === "Providers" && provShowSubMenu && (
                        <div className="py-2 space-y-2 pl-4">
                            {provSubMenuItems.map((subItem) => (
                                <button
                                    key={subItem.id}
                                    onClick={() => handleSubItemClick(subItem.nav)}
                                    className={`flex items-center gap-x-2 px-6 py-2 w-full ${`/${subItem.nav}` === location.pathname
                                        ? "border-l-4 -ml-4 border-primary bg-gray-50"
                                        : ""
                                    }`}
                                >
                                    <p className="font-bold">
                                        &gt; <span className="font-normal ml-1">{subItem.name}</span>
                                    </p>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}
