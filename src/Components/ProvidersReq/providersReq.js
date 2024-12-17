import React, { useState } from "react";
import NavBar from "../NavBar/navBar";
import Header from "../Header/header";

export default function ProvidersReq() {
    const [search, setSearch] = useState("");
    const [selectedProviderReq, setSelectedProviderReq] = useState("");
    const [address, setAddress] = useState("");
    const [range, setRange] = useState("");

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

    // Filtering logic
    const filteredServiceProviders = serviceProvidersData.filter((provider) => {
        const matchesName = provider.name.toLowerCase().includes(search.toLowerCase());
        const matchesProviderType = selectedProviderReq
            ? provider.providerType.toLowerCase() === selectedProviderReq.toLowerCase()
            : true;
        const matchesAddress = address
            ? provider.addresses.toLowerCase().includes(address.toLowerCase())
            : true;
        const matchesRange = range
            ? provider.availableRange.toLowerCase().includes(range.toLowerCase())
            : true;

        return matchesName && matchesProviderType && matchesAddress && matchesRange;
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
                    <div className="flex gap-x-5 text-sm justify-center items-center flex-wrap">
                        {/* Search by Name */}
                        <div className="flex px-1 py-1.5 rounded-xl bg-white space-x-3">
                            <img src="/Search.png" alt="Search" className="ml-2" />
                            <input
                                type="text"
                                placeholder="Search by Name"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="outline-none"
                            />
                        </div>

                        {/* Filter by Provider Type */}
                        <div className="flex pl-3 pr-1 py-2.5 rounded-xl bg-white space-x-3">
                            <select
                                className="outline-none bg-transparent"
                                value={selectedProviderReq}
                                onChange={(e) => setSelectedProviderReq(e.target.value)}
                            >
                                <option value="">All Provider Types</option>
                                {/* Add provider types dynamically if available */}
                                <option value="Plumber">Plumber</option>
                                <option value="Electrician">Electrician</option>
                            </select>
                        </div>

                        {/* Search by Address */}
                        <div className="flex pl-3 py-2 rounded-xl bg-white space-x-3">
                            <input
                                type="text"
                                placeholder="Search by Address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="outline-none"
                            />
                        </div>

                        {/* Search by Available Range */}
                        <div className="flex pl-3 py-2 rounded-xl bg-white space-x-3">
                            <input
                                type="text"
                                placeholder="Search by Available Range"
                                value={range}
                                onChange={(e) => setRange(e.target.value)}
                                className="outline-none"
                            />
                        </div>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-y-3 text-xs">
                        <thead>
                            <tr className="text-gray-500 font-semibold text-left">
                                <th className="py-2 pr-3">Profile</th>
                                <th className="py-2 px-3">Provider Type</th>
                                <th className="py-2 px-3">Phone No</th>
                                <th className="py-2 px-3">Addresses</th>
                                <th className="py-2 px-3">Available Range</th>
                                <th className="py-2 px-3">Taxes</th>
                                <th className="py-2 px-3">Available</th>
                                <th className="py-2 px-3">Updated At</th>
                                <th className="py-2 px-3"></th>
                            </tr>
                        </thead>
                        <tbody className=" bg-white border border-gray-200">
                            {filteredServiceProviders.map((provider) => (
                                <tr key={provider.id} className="border-t hover:bg-gray-100">
                                    <td>
                                        <div className="flex gap-x-3 items-center">
                                            <div>
                                                <img
                                                    src={provider.image}
                                                    alt={provider.name}
                                                    className="w-12 h-12"
                                                />
                                            </div>
                                            <div>
                                                <div>{provider.name}</div>
                                                <div className="text-gray-700">{provider.mobileNumber}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-2 px-3">{provider.providerType}</td>
                                    <td className="py-2 px-3">{provider.phNumber}</td>
                                    <td className="py-2 px-3">{provider.addresses}</td>
                                    <td className="py-2 px-3">{provider.availableRange}</td>
                                    <td className="py-2 px-3">{provider.taxes}</td>
                                    <td className="text-center">
                                        <span className={`px-2 py-1 rounded ${provider.availability ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                            {provider.availability ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3">{formatDate(provider.updatedAt)}</td>
                                    <td className="py-2 px-3 text-right">
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
    );
}
