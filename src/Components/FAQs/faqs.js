import React, { useState } from "react";
import NavBar from "../NavBar/navBar";
import Header from "../Header/header";

export default function FAQs() {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(null);

    const faqs = [
        {
            id: 1,
            question: "Voluptas consequatur tempore sit ad.",
            answer: "Alice led the way, and the Dormouse indi...",
            faq_category: "Misc",
            update_at: "10/11/21"
        },
        {
            id: 2,
            question: "Velit ea et officiis fugiat distinctio i.",
            answer: "Caterpillar. Alice thought the whole thi",
            faq_category: "Misc",
            update_at: "22/09/21"
        },
        {
            id: 3,
            question: "Ullam neque labore et. Quis quia ipsum s...",
            answer: "The Dormouse slowly opened his eyes were.",
            faq_category: "EServices",
            update_at: "22/02/21"
        },
        {
            id: 4,
            question: "How much would it cost.",
            answer: "Not much.",
            faq_category: "General",
            update_at: "22/02/21"
        },
    ];

    const filteredFAQs = faqs.filter((faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase())
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
                            <h1 className="font-bold text-2xl my-6">FAQs</h1>
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
                                        <th className="py-4 px-6 text-center">Question</th>
                                        <th className="py-4 px-6 text-center">Answer</th>
                                        <th className="py-4 px-6 text-center">FAQ Category</th>
                                        <th className="py-4 px-6 text-center">Updated At</th>
                                        <th className="py-4 px-6 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredFAQs.map((faq) => (
                                        <tr key={faq.id} className="border-t hover:bg-gray-100">
                                            <td className="font-medium text-center">{faq.question}</td>
                                            <td className="font-medium text-center">{faq.answer}</td>
                                            <td className="py-4 px-6 text-center">{faq.faq_category}</td>
                                            <td className="py-4 px-6 text-center">{faq.update_at}</td>
                                            <td className="py-4 px-6 text-right relative">
                                                <button
                                                    className="focus:outline-none"
                                                    onClick={() => toggleMenu(faq.id)}
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
                                                {menuOpen === faq.id && (
                                                    <div className="absolute right-0 z-10 mt-2 w-48 bg-white x rounded-lg shadow-lg">
                                                        <ul>
                                                            <li
                                                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                                onClick={() => alert(`Edit ${faq.question}`)}
                                                            >
                                                                Edit
                                                            </li>
                                                            <li
                                                                className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                                onClick={() => alert(`Delete ${faq.question}`)}
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
