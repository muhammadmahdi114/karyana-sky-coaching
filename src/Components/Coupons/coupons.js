import React, { useState } from "react";
import NavBar from "../NavBar/navBar";
import Header from "../Header/header";

export default function Coupons() {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(null);

    const coupons = [
        {
            id: 1,
            code: "PRO3",
            discount: 2000,
            description: "Desc",
            expires_at: "10/11/24",
            enabled: true,
            update_at: "10/11/21"
        },
        {
            id: 2,
            code: "PROMO",
            discount: 10000,
            description: "Nostrum in ipsa, sit. ",
            expires_at: "10/11/24",
            enabled: true,
            update_at: "10/11/21"
        },
        {
            id: 3,
            code: "NEWCODE",
            discount: 500,
            description: "New Code",
            expires_at: "15/02/25",
            enabled: false,
            update_at: "10/11/21"
        },
    ];

    const filteredCoupons = coupons.filter((coupon) =>
        coupon.code.toLowerCase().includes(search.toLowerCase())
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
                            <h1 className="font-bold text-2xl my-6">Coupons</h1>
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
                                        <th className="py-4 px-6 text-center">Code</th>
                                        <th className="py-4 px-6 text-center">Discount</th>
                                        <th className="py-4 px-6 text-center">Description</th>
                                        <th className="py-4 px-6 text-center">Expires At</th>
                                        <th className="py-4 px-6 text-center">Enabled</th>
                                        <th className="py-4 px-6 text-center">Updated At</th>
                                        <th className="py-4 px-6 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCoupons.map((coupon) => (
                                        <tr key={coupon.id} className="border-t hover:bg-gray-100">
                                            <td className="font-medium text-center">{coupon.code}</td>
                                            <td className="font-medium text-center">{coupon.discount}</td>
                                            <td className="py-4 px-6 text-center">{coupon.description}</td>
                                            <td className="font-medium text-center">{coupon.expires_at}</td>
                                            <td className="text-center">
                                                    <span className={`px-2 py-1 rounded ${coupon.enabled ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                                        {coupon.enabled ? 'Yes' : 'No'}
                                                    </span>
                                                </td>
                                            <td className="py-4 px-6 text-center">{coupon.update_at}</td>
                                            <td className="py-4 px-6 text-right relative">
                                                <button
                                                    className="focus:outline-none"
                                                    onClick={() => toggleMenu(coupon.id)}
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
                                                {menuOpen === coupon.id && (
                                                    <div className="absolute right-0 z-10 mt-2 w-48 bg-white x rounded-lg shadow-lg">
                                                        <ul>
                                                            <li
                                                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                                onClick={() => alert(`Edit ${coupon.code}`)}
                                                            >
                                                                Edit
                                                            </li>
                                                            <li
                                                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                                onClick={() => alert(`Delete ${coupon.code}`)}
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
