import React, { useState } from "react";
import NavBar from "../NavBar/navBar";
import Header from "../Header/header";

export default function Categories() {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(null);

    const categories = [
        {
            id: 1,
            image: "/dp-user.png",
            name: "Car Services",
            color: "#007AFF",
            description: "Categories for all cars services",
            featured: true,
            order: "1",
            parent_category: "Services",
            updatedAt: "22/10/24",
        },
        {
            id: 2,
            image: "/dp-user.png",
            name: "Medical Services",
            color: "#0abde3",
            description: "Categories for all Medical Services",
            featured: true,
            order: "2",
            parent_category: "Services",
            updatedAt: "02/10/24",
        },
        {
            id: 3,
            image: "/dp-user.png",
            name: "Sewer Cleaning",
            color: "#10ac84",
            description: "Category for Sewer Cleaning",
            featured: false,
            order: "5",
            parent_category: "Washing & Cleaning",
            updatedAt: "12/10/24",
        },
    ];

    const filteredCategories = categories.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
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
                            <h1 className="font-bold text-2xl my-6">Categories</h1>
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
                                        <th className="py-4 px-6 text-center">Color</th>
                                        <th className="py-4 px-6 text-center">Description</th>
                                        <th className="py-4 px-6 text-center">Featured</th>
                                        <th className="py-4 px-6 text-center">Order</th>
                                        <th className="py-4 px-6 text-center">Parent Category</th>
                                        <th className="py-4 px-6 text-center">Updated At</th>
                                        <th className="py-4 px-6 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCategories.map((category) => (
                                        <tr key={category.id} className="border-t hover:bg-gray-100">
                                            <td className="py-4 px-6 flex justify-center items-center">
                                                <img
                                                    src={category.image}
                                                    alt={category.name}
                                                    className="w-10 h-10 rounded-full"
                                                />
                                            </td>
                                            <td className="font-medium text-center">{category.name}</td>
                                            <td
                                                className="font-medium text-center"
                                                style={{ backgroundColor: category.color }}
                                            >
                                                {category.color}
                                            </td>
                                            <td className="py-4 px-6 text-center">{category.description}</td>
                                            <td className="font-medium text-center">
                                                <input
                                                    type="checkbox"
                                                    checked={category.featured}
                                                    readOnly
                                                />
                                            </td>
                                            <td className="font-medium text-center">{category.order}</td>
                                            <td className="py-4 px-6 text-center font-bold">{category.parent_category}</td>
                                            <td className="py-4 px-6 text-center">{category.updatedAt}</td>
                                            <td className="py-4 px-6 text-right relative">
                                                <button
                                                    className="focus:outline-none"
                                                    onClick={() => toggleMenu(category.id)}
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
                                                {menuOpen === category.id && (
                                                    <div className="absolute right-0 z-10 mt-2 w-48 bg-white x rounded-lg shadow-lg">
                                                        <ul>
                                                            <li
                                                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                                onClick={() => alert(`Edit ${category.name}`)}
                                                            >
                                                                Edit
                                                            </li>
                                                            <li
                                                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                                onClick={() => alert(`Delete ${category.name}`)}
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
