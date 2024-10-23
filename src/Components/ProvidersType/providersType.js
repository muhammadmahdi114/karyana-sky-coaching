import React from "react";
import NavBar from "../NavBar/navBar";
import Header from "../Header/header";

export default function ProvidersType() {

    const providerType = [
        {
            id: 1,
            providerType: "Plumber",
            commission: "75",
            disabled: true,            
            updatedAt: "2024-10-20",
        },
        {
            id: 2,
            providerType: "Karyana",
            commission: "5",
            disabled: false,            
            updatedAt: "2024-01-10",
        },
        {
            id: 3,
            providerType: "Bakery",
            commission: "20",
            disabled: false,            
            updatedAt: "2023-10-20",
        },
    ];
    return (
        <>
            <NavBar />
            <Header />
            <div className="ml-60 h-screen bg-gray-100 px-8 py-5">
                <h1 className="font-bold text-2xl my-6">Providers Type</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead>
                            <tr className="text-gray-500 font-semibold text-left">
                                <th className="py-4 px-6">Name</th>
                                <th className="py-4 px-6">Commission</th>
                                <th className="py-4 px-6">Disabled</th>                             
                                <th className="py-4 px-6">Updated At</th>
                                <th className="py-4 px-6"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {providerType.map((type) => (
                                <tr key={type.id} className="border-t hover:bg-gray-100">
                                    <td className="py-4 px-6">{type.providerType}</td>
                                    <td className="py-4 px-6">{type.commission}</td>
                                   
                                    <td className="py-4 px-6">
                                        <input
                                            type="checkbox"
                                            checked={type.disabled}
                                            className="toggle-checkbox"
                                        />
                                    </td>
                                    <td className="py-4 px-6">{type.updatedAt}</td>
                                    <td className="py-4 px-6 text-right">
                                        <button className="focus:outline-none">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="1.5"
                                                stroke="currentColor"
                                                className="w-6 h-6 text-black border-2 rounded-lg hover:bg-gray-300"
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