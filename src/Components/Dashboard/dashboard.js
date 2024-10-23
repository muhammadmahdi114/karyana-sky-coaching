import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/navBar";
import Header from "../Header/header";

export default function Dashboard() {
    const [totalUsers, setTotalUsers] = useState(null);
    const [totalServiceProviders, setTotalServiceProviders] = useState(null);
    const [totalCategories, setTotalCategories] = useState(null);
    const [totalBookings, setTotalBookings] = useState(null);
    const [totalRevenue, setTotalRevenue] = useState(10000);

    useEffect(() => {
        setTotalUsers(500);
        setTotalServiceProviders(54);
        setTotalCategories(12);
        setTotalBookings(431);
        setTotalRevenue(10000);
    }, []);

    const cards = [
        {
            id: 1,
            title: "Total Users",
            number: totalUsers,
        },
        {
            id: 2,
            title: "Total Service Providers",
            number: totalServiceProviders,
        },
        {
            id: 3,
            title: "Total Categories",
            number: totalCategories,
        },
        {
            id: 4,
            title: "Total Bookings",
            number: totalBookings,
        },
        {
            id: 5,
            title: "Total Revenue",
            number: totalRevenue,
        },
    ];

    return (
        <>
        <NavBar activeState="Dashboard"/>
            <Header />
            <div className="h-screen ml-60 bg-gray-100 px-8 py-5">
                <h1 className="font-bold text-3xl my-6">Dashboard</h1>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {cards.map(card => (
                        <div key={card.id} className="bg-white p-6 rounded-lg shadow-sm">
                            <h3 className="text-md">{card.title}</h3>
                            <p className="text-2xl font-semibold mt-3">{card.number}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
