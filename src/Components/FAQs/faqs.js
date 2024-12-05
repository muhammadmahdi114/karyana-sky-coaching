import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/navBar";
import Header from "../Header/header";
import axios from "axios";

export default function FAQs() {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(null);
    const [addFaq, setAddFaq] = useState(false);
    const [faqList, setFaqList] = useState([]);
    const [newFAQ, setNewFAQ] = useState({
        question: "",
        answer: "",
        faq_category: "",
    });

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await axios.get(`https://karyana-backend.vercel.app/get-faqs`);
                setFaqList(response.data);
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            }
        }; fetchFAQs();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewFAQ({
            ...newFAQ,
            [name]: value,
        });
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const handleAddFaq = async () => {
        const newFAQData = { ...newFAQ, updatedAt: new Date().toLocaleDateString("en-GB") };
        try {
            const response = await axios.post(`https://karyana-backend.vercel.app/add-faqs`, newFAQData, {
                headers: { 'Content-Type': 'application/json', },
            });
            setFaqList([...faqList, response.data]);
            setAddFaq(false); setNewFAQ({
                question: "",
                answer: "",
                faq_category: "",
            });
        } catch (error) {
            console.error('Error adding FAQ:', error);
        }
    };

    const toggleMenu = (id) => {
        setMenuOpen(menuOpen === id ? null : id);
    };

    const filteredFAQs = faqList.filter((faq) =>
        faq.question.toLowerCase().includes(search.toLowerCase()));

    return (
        <>
            <NavBar />
            <Header />
            <div className="min-h-screen ml-60 bg-gray-100 px-8 py-5">
                <div className="mt-4">
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
                            <button
                                onClick={() => setAddFaq(true)}
                                className="bg-[#89b8ff] h-12 rounded-xl flex items-center px-5 py-4 text-primary font-bold"
                            >
                                <span className="text-2xl mb-1 mr-2">+</span> Add FAQ
                            </button>
                        </div>
                    </div>
                    {addFaq && (
                        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                            <div className="bg-white rounded-xl shadow-lg w-80">
                                <h2 className="py-4 px-6 text-lg font-bold mb-4 text-start border-b-2 ">Add FAQ</h2>
                                <div className="p-6">
                                    <input
                                        type="text"
                                        name="question"
                                        placeholder="Question"
                                        value={newFAQ.question}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
                                    />
                                    <input
                                        type="text"
                                        name="answer"
                                        placeholder="Answer"
                                        value={newFAQ.answer}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
                                    />
                                    <input
                                        type="text"
                                        name="faq_category"
                                        placeholder="FAQ Category"
                                        value={newFAQ.faq_category}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
                                    />
                                    <div className="flex justify-between gap-x-3 mt-4">
                                        <button
                                            onClick={() => setAddFaq(false)}
                                            className="bg-gray-300 rounded-lg px-10 py-2 transition duration-150 hover:bg-gray-400"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleAddFaq}
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
                        <table className="min-w-full text-xs">
                            <thead>
                                <tr className="text-gray-500 font-semibold">
                                    <th className="py-4 px-6 text-start">Question</th>
                                    <th className="py-4 px-6 text-start">Answer</th>
                                    <th className="py-4 px-6 text-center">FAQ Category</th>
                                    <th className="py-4 px-6 text-center">Updated At</th>
                                    <th className="py-4 px-6 text-center"></th>
                                </tr>
                            </thead>
                            <tbody className=" bg-white border border-gray-200">
                                {filteredFAQs.map((faq) => (
                                    <tr key={faq.id} className="border-t hover:bg-gray-100">
                                        <td className="pl-4 font-medium text-start">{faq.question}</td>
                                        <td className="font-medium text-start">{faq.answer}</td>
                                        <td className="py-4 px-6 text-center">{faq.faq_category}</td>
                                        <td className="py-4 px-6 text-center">{formatDate(faq.updatedAt)}</td>
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
                                                <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-lg shadow-lg">
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
        </>
    );
}
