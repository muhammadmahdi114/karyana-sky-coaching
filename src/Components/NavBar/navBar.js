import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
    const [activeSection, setActiveSection] = useState(null);
    const [provShowSubMenu, setProvShowSubMenu] = useState(false);
    const [bookingsShowSubMenu, setBookingsShowSubMenu] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const currentPath = location.pathname;

        if (currentPath === "/dashboard") {
            setActiveSection("Dashboard");
            setProvShowSubMenu(false);
            setBookingsShowSubMenu(false);
        } else if (currentPath === "/categories") {
            setActiveSection("Categories");
            setProvShowSubMenu(false);
            setBookingsShowSubMenu(false);
        } else if (["/providers", "/providers-req", "/providers-type"].includes(currentPath)) {
            setActiveSection("Providers");
            setProvShowSubMenu(true);
            setBookingsShowSubMenu(false);
        } else if (currentPath === "/services") {
            setActiveSection("Services");
            setBookingsShowSubMenu(false);
            setProvShowSubMenu(false);
        } else if (currentPath === "/coupons") {
            setActiveSection("Coupons");
            setProvShowSubMenu(false);
            setBookingsShowSubMenu(false);
        } else if (currentPath === "/faqs") {
            setActiveSection("FAQs");
            setProvShowSubMenu(false);
            setBookingsShowSubMenu(false);
        } else if (currentPath === "/privacy-policy") {
            setActiveSection("Privacy Policy");
            setProvShowSubMenu(false);
            setBookingsShowSubMenu(false);
        } else if (currentPath === "/terms-and-conditions") {
            setActiveSection("Terms and Conditions");
            setProvShowSubMenu(false);
            setBookingsShowSubMenu(false);
        } else if (currentPath === "/about-us") {
            setActiveSection("About Us");
            setProvShowSubMenu(false);
            setBookingsShowSubMenu(false);
        } else if (currentPath === "/users") {
            setActiveSection("Users");
            setProvShowSubMenu(false);
            setBookingsShowSubMenu(false);
        } else if (["/bookings", "/bookings-req"].includes(currentPath)) {
            setActiveSection("Bookings");
            setProvShowSubMenu(false);
            setBookingsShowSubMenu(true);
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
            name: "Users",
            activeIcon: "/activeProviders.svg",
            inactiveIcon: "/inactiveProviders.svg",
        },
        {
            id: 4,
            name: "Categories",
            activeIcon: "/activeCategories.svg",
            inactiveIcon: "/inactiveCategories.svg",
        },
        {
            id: 5,
            name: "Services",
            activeIcon: "/activeServices.svg",
            inactiveIcon: "/inactiveServices.svg",
        },
        {
            id: 6,
            name: "Bookings",
            activeIcon: "/activeBookings.svg",
            inactiveIcon: "/inactiveBookings.svg",
        },
        {
            id: 7,
            name: "Coupons",
            activeIcon: "/activeCoupons.svg",
            inactiveIcon: "/inactiveCoupons.svg",
        },
        {
            id: 8,
            name: "FAQs",
            activeIcon: "/activeFAQ.svg",
            inactiveIcon: "/inactiveFAQ.svg",
        },
        {
            id: 9,
            name: "Privacy Policy",
            activeIcon: "/activeDoc.svg",
            inactiveIcon: "/inactiveDoc.svg",
        },
        {
            id: 10,
            name: "Terms and Conditions",
            activeIcon: "/activeDoc.svg",
            inactiveIcon: "/inactiveDoc.svg",
        },
        {
            id: 11,
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

    const bookingsSubMenuItems = [
        { id: 1, name: "Bookings Requests", nav: "bookings-req" },
    ];

    const handleMainItemClick = (itemName) => {
        setActiveSection(itemName);
        if (itemName === "Providers") {
            setProvShowSubMenu(!provShowSubMenu);
            setBookingsShowSubMenu(false);
        } else if (itemName === "Bookings") {
            setBookingsShowSubMenu(!bookingsShowSubMenu);
            setProvShowSubMenu(false);
        } else {
            setProvShowSubMenu(false);
            setBookingsShowSubMenu(false);

            const formattedRoute = itemName.toLowerCase().replace(/ /g, "-");
            navigate(`/${formattedRoute}`);
        }
    };

    const handleSubItemClick = (subItemNav) => {
        setActiveSection("Providers");
        navigate(`/${subItemNav}`);
    };

    const handleBookingsSubItemClick = (bookingSubItemNav) => {
        setActiveSection("Bookings");
        navigate(`/${bookingSubItemNav}`);
    };

    return (
        <div className="fixed left-0 top-0 bg-white w-60 h-screen flex flex-col">
            <h1 className="text-2xl text-primary font-krona font-bold border-b p-6 mb-5">Karyana</h1>
            {menuItems.map((item) => (
                <div key={item.id} className="my-2">
                    <button
                        onClick={() => handleMainItemClick(item.name)}
                        className={`flex items-center gap-x-2 px-6 py-2 w-full ${item.name === activeSection ||
                            (item.name === "Providers" && provShowSubMenu) ||
                            (item.name === "Bookings" && bookingsShowSubMenu)
                            ? "border-l-4 border-primary bg-gray-50"
                            : ""
                            }`}
                    >
                        <img
                            src={
                                item.name === activeSection ||
                                    (item.name === "Providers" && provShowSubMenu) ||
                                    (item.name === "Bookings" && bookingsShowSubMenu)
                                    ? item.activeIcon
                                    : item.inactiveIcon
                            }
                            alt={item.name}
                        />
                        <span>{item.name}</span>
                        {/* Dropdown Icon */}
                        {(item.name === "Providers" || item.name === "Bookings") && (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`w-4 h-4 ml-2 transition-transform ${item.name === "Providers" && provShowSubMenu
                                    ? "transform rotate-180"
                                    : item.name === "Bookings" && bookingsShowSubMenu
                                    ? "transform rotate-180"
                                    : ""
                                    }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        )}
                    </button>

                    {/* Providers Sub Menu */}
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

                    {/* Bookings Sub Menu */}
                    {item.name === "Bookings" && bookingsShowSubMenu && (
                        <div className="py-2 space-y-2 pl-4">
                            {bookingsSubMenuItems.map((subItem) => (
                                <button
                                    key={subItem.id}
                                    onClick={() => handleBookingsSubItemClick(subItem.nav)}
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
