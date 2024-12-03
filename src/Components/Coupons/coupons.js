import React, { useState, useEffect } from 'react';
import NavBar from "../NavBar/navBar";
import Header from "../Header/header";
import axios from 'axios';

export default function Coupons() {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(null);
    const [addCoupon, setAddCoupon] = useState(false);
    const [newCoupon, setNewCoupon] = useState({
        code: "",
        discount: "",
        description: "",
        expires_at: "",
        enabled: true,
    });

    const [couponList, setCouponList] = useState([]);

    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                const response = await axios.get(`https://karyana-backend.vercel.app/get-coupons`);
                setCouponList(response.data);
            } catch (error) {
                console.error('Error fetching coupons:', error);
            }
        };

        fetchCoupons();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCoupon({
            ...newCoupon,
            [name]: value,
        });
    };

    const handleAddCoupon = async () => {
        const newCouponData = {
            ...newCoupon,
            updatedAt: new Date().toISOString(),
        };

        try {
            const response = await axios.post(`https://karyana-backend.vercel.app/add-coupons`, newCouponData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setCouponList([...couponList, response.data]);
            setAddCoupon(false);
            setNewCoupon({
                code: "",
                discount: "",
                description: "",
                expires_at: "",
                enabled: true,
            });
        } catch (error) {
            console.error('Error adding coupon:', error);
        }
    };

    const filteredCoupons = couponList.filter((coupon) =>
        coupon.code.toLowerCase().includes(search.toLowerCase())
    );

    const toggleMenu = (id) => {
        if (menuOpen === id) {
            setMenuOpen(null);
        } else {
            setMenuOpen(id);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    return (
        <>
            <NavBar />
            <Header />
            <div className="min-h-screen ml-60 bg-gray-100 px-8 py-5">
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

                                <button
                                    onClick={() => setAddCoupon(true)}
                                    className="bg-[#89b8ff] h-12 rounded-xl flex items-center px-5 py-4 text-primary font-bold"
                                >
                                    <span className="text-2xl mb-1 mr-2">+</span> Add Coupon
                                </button>
                            </div>
                        </div>
                        {addCoupon && (
                            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                <div className="bg-white rounded-xl shadow-lg w-80">
                                    <h2 className="py-4 px-6 text-lg font-bold mb-4 text-start border-b-2 ">Add FAQ</h2>
                                    <div className="p-6">
                                        <input
                                            type="text"
                                            name="code"
                                            placeholder="Code"
                                            value={newCoupon.code}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
                                        />
                                        <input
                                            type="number"
                                            name="discount"
                                            placeholder="Discount"
                                            value={newCoupon.discount}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
                                        />
                                        <input
                                            type="text"
                                            name="description"
                                            placeholder="Description"
                                            value={newCoupon.description}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
                                        />
                                        <label className="flex flex-col items-start gap-y-2">
                                            Expires At:

                                            <input
                                                type="date"
                                                name="expires_at"
                                                placeholder="Expires At"
                                                value={newCoupon.expires_at}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
                                            />
                                        </label>
                                        <label className="flex items-center ml-2 mb-4">
                                            <input
                                                type="checkbox"
                                                name="enabled"
                                                checked={newCoupon.enabled}
                                                onChange={(e) => setNewCoupon({
                                                    ...newCoupon,
                                                    enabled: e.target.checked
                                                })}
                                                className="mr-2 h-5 w-5 text-blue-500 border border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            />
                                            Enabled
                                        </label>
                                        <div className="flex justify-between gap-x-3 mt-4">
                                            <button
                                                onClick={() => setAddCoupon(false)}
                                                className="bg-gray-300 rounded-lg px-10 py-2 transition duration-150 hover:bg-gray-400"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleAddCoupon}
                                                className="bg-blue-500 text-white rounded-lg px-12 py-2 transition duration-150 hover:bg-blue-600"
                                            >
                                                Save
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
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
                                            <td className="font-medium text-center">{formatDate(coupon.expires_at)}</td>
                                            <td className="text-center">
                                                <span className={`px-2 py-1 rounded ${coupon.enabled ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                                    {coupon.enabled ? 'Yes' : 'No'}
                                                </span>
                                            </td>
                                            <td className="py-4 px-6 text-center">{formatDate(coupon.updatedAt)}</td>
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
