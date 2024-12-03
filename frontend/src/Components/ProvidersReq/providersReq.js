import React, { useState } from "react";
import NavBar from "../NavBar/navBar";
import Header from "../Header/header";

export default function ProvidersReq() {

    const [search, setSearch] = useState("");

    const serviceProvidersData = [
        {
            id: 1,
            image: "/dp-user.png",
            name: "Alice Brown",
            providerType: "Plumber",
            phNumber: "03312345679",
            mobileNumber: "03312345680",
            addresses: "123 Street, City",
            availableRange: "20KMs",
            taxes: "5%",
            availability: true,
            accepted: true,
            updatedAt: "2024-10-20",
        },
        {
            id: 2,
            image: "/dp-user.png",
            name: "Bob White",
            providerType: "Electrician",
            phNumber: "03312345681",
            mobileNumber: "03312345682",
            addresses: "456 Avenue, City",
            availableRange: "25KMs",
            taxes: "7%",
            availability: false,
            accepted: false,
            updatedAt: "2024-10-21",
        },
    ];

    const filteredServiceProviders = serviceProvidersData.filter((provider) => {
        const matchesName = provider.name.toLowerCase().includes(search.toLowerCase());
        return matchesName;
    });

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };
    return (
        <>
            <NavBar />
            <Header />
            <div className="min-h-screen ml-60 bg-gray-100 px-8 py-5">
                <div className="flex w-full justify-between">
                    <h1 className="font-bold text-2xl my-6">Providers Requests</h1>
                    <div className="flex gap-x-5 justify-center items-center">
                        <div className="flex px-2 py-4 rounded-xl bg-white space-x-2">
                            <img src="/Search.png" alt="Search" />
                            <input
                                type="text"
                                placeholder="Search by name, role.."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="text-gray-500 font-semibold text-left">
                                <th className="py-4 px-6"></th>
                                <th className="py-4 pr-6">Name</th>
                                <th className="py-4 px-6">Provider Type</th>
                                <th className="py-4 px-6">Phone No</th>
                                <th className="py-4 px-6">Mobile No</th>
                                <th className="py-4 px-6">Addresses</th>
                                <th className="py-4 px-6">Available Range</th>
                                <th className="py-4 px-6">Taxes</th>
                                <th className="py-4 px-6">Available</th>
                                <th className="py-4 px-6">Updated At</th>
                                <th className="py-4 px-6"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredServiceProviders.map((provider) => (
                                <tr key={provider.id} className="border-t hover:bg-gray-100">
                                    <td className="py-4 px-6 flex items-center">
                                        <img
                                            src={provider.image}
                                            alt={provider.name}
                                            className="w-10 h-10 rounded-full mt-2 mr-10"
                                        />
                                    </td>
                                    <td className="py-4 pr-6">{provider.name}</td>
                                    <td className="py-4 px-6">{provider.providerType}</td>
                                    <td className="py-4 px-6">{provider.phNumber}</td>
                                    <td className="py-4 px-6">{provider.mobileNumber}</td>
                                    <td className="py-4 px-6">{provider.addresses}</td>
                                    <td className="py-4 px-6">{provider.availableRange}</td>
                                    <td className="py-4 px-6">{provider.taxes}</td>
                                    <td className="text-center">
                                        <span className={`px-2 py-1 rounded ${provider.availability ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                            {provider.availability ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className="py-4 px-6">{formatDate(provider.updatedAt)}</td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="focus:outline-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6 text-gray-700 border-2 rounded-lg hover:bg-gray-300"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M12 6.75v.008m0 5.25v.008m0 5.25v.008"
                                                />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}