import React, { useState } from "react";
import NavBar from "../NavBar/navBar";
import Header from "../Header/header";

export default function ServiceList() {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(null);

    const services = [
        {
            id: 1,
            image: "/dp-user.png",
            name: "Post Party Cleaning",
            provider: "Cleaning Services Inc.",
            price: "400",
            discount_price: "350",
            categories: "Medical Services, Beauty & Hair Cuts",
            available: false,
            updatedAt: "22/10/24",
        },
        {
            id: 2,
            image: "/dp-user.png",
            name: "Wedding Photos",
            provider: "Concrete Gusikowski Ltd",
            price: "500",
            discount_price: "-",
            categories: "Laundry Service, Washing & Cleaning",
            available: true,
            updatedAt: "02/10/24",
        },
        {
            id: 3,
            image: "/dp-user.png",
            name: "Hair Style Service",
            provider: "Architect Lehner, Mitchell and Balistreri",
            price: "350",
            discount_price: "300",
            categories: "Media & Photography",
            available: true,
            updatedAt: "14/10/24",
        },
    ];

    const filteredServices = services.filter((service) =>
        service.name.toLowerCase().includes(search.toLowerCase())
    );

    const toggleMenu = (id) => {
        if (menuOpen === id) {
            setMenuOpen(null);
        } else {
            setMenuOpen(id);
        }
    };

    return (
        <>
            <NavBar />
            <Header />
            <div className="h-screen ml-60 bg-gray-100 px-8 py-5">
                <div className="mt-4">
                    <div>
                        <div className="flex w-full justify-between">
                            <h1 className="font-bold text-2xl my-6">Services</h1>
                            <div className="flex gap-x-5 justify-center items-center">
                                <div className="flex px-2 py-4 rounded-xl bg-white space-x-2">
                                    <img src="/Search.png" alt="Search" />
                                    <input
                                        type="text"
                                        placeholder="Search by name.."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="text-gray-500 font-semibold text-left">
                                        <th className="py-4 px-6 text-center">Image</th>
                                        <th className="py-4 px-6 text-center">Name</th>
                                        <th className="py-4 px-6 text-center">Provider</th>
                                        <th className="py-4 px-6 text-center">Price</th>
                                        <th className="py-4 px-6 text-center">Discounted Price</th>
                                        <th className="py-4 px-6 text-center">Categories</th>
                                        <th className="py-4 px-6 text-center">Available</th>
                                        <th className="py-4 px-6 text-center">Updated At</th>
                                        <th className="py-4 px-6 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredServices.map((service) => (
                                        <tr key={service.id} className="border-t hover:bg-gray-100">
                                            <td className="py-4 px-6 flex justify-center items-center">
                                                <img
                                                    src={service.image}
                                                    alt={service.name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            </td>
                                            <td className="font-medium text-center">{service.name}</td>
                                            <td className="font-medium text-center">{service.provider}</td>
                                            <td className="py-4 px-6 text-center">{service.price}</td>
                                            <td className="font-medium text-center">{service.discount_price}</td>
                                            <td className="py-4 px-6 text-center">{service.categories}</td>
                                            <td className="font-medium text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={service.available}
                                                    readOnly
                                                />
                                            </td>
                                            <td className="py-4 px-6 text-center">{service.updatedAt}</td>
                                            <td className="py-4 px-6 text-right relative">
                                                <button
                                                    className="focus:outline-none"
                                                    onClick={() => toggleMenu(service.id)}
                                                >
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
                                                {menuOpen === service.id && (
                                                    <div className="absolute right-0 z-10 mt-2 w-48 bg-white x rounded-lg shadow-lg">
                                                        <ul>
                                                            <li
                                                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                                onClick={() => alert(`Edit ${service.name}`)}
                                                            >
                                                                Edit
                                                            </li>
                                                            <li
                                                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                                onClick={() => alert(`Delete ${service.name}`)}
                                                            >
                                                                Delete
                                                            </li>
                                                        </ul>
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
