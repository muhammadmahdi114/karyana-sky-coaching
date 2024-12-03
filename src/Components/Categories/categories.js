import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../NavBar/navBar";
import Header from "../Header/header";

export default function Categories() {
    const [search, setSearch] = useState("");
    const [menuOpen, setMenuOpen] = useState(null);
    const [addCategory, setAddCategory] = useState(false);
    const [newCategory, setNewCategory] = useState({
        image: "",
        name: "",
        color: "",
        description: "",
        featured: false,
        order: "",
    });

    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/get-categories`);
                setCategoryList(response.data);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setNewCategory({
            ...newCategory,
            [name]: newValue,
        });
    };

    const handleAddCategory = async () => {
        const newCategoryData = {
            ...newCategory,
            updatedAt: new Date().toLocaleDateString("en-GB")
        };

        try {
            const response = await axios.post(`http://localhost:8000/add-categories`, newCategoryData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setCategoryList([...categoryList, response.data]);
            setAddCategory(false);
            setNewCategory({
                image: "",
                name: "",
                color: "",
                description: "",
                featured: false,
                order: "",
            });
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewCategory({
                ...newCategory,
                image: imageUrl,
            });
        }
    };

    const toggleMenu = (id) => {
        if (menuOpen === id) {
            setMenuOpen(null);
        } else {
            setMenuOpen(id);
        }
    };

    const filteredCategories = categoryList.filter((category) =>
        category.name.toLowerCase().includes(search.toLowerCase())
    );

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
                                <button
                                    onClick={() => setAddCategory(true)}
                                    className="bg-[#89b8ff] h-12 rounded-xl flex items-center px-5 py-4 text-primary font-bold"
                                >
                                    <span className="text-2xl mb-1 mr-2">+</span> Add Category
                                </button>
                            </div>
                        </div>
                        {addCategory && (
                            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                <div className="bg-white rounded-xl shadow-lg w-80 max-h-[90vh] overflow-y-auto">
                                    <h2 className="py-4 px-6 text-lg font-bold mb-4 text-start border-b-2 ">Add Category</h2>
                                    <div className="px-6">
                                        <div className="flex flex-col items-center mb-6">
                                            <span className="w-full text-start mb-2">Profile Image</span>
                                            <label className="flex flex-col items-center justify-center w-full text-sm h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition duration-150">
                                                {newCategory.image ? (
                                                    <div className="mb-2">
                                                        <img src={newCategory.image} alt="Uploaded" className="w-full h-40 object-cover rounded-xl" />

                                                    </div>
                                                ) : (
                                                    <div className="mb-2 flex flex-col items-center justify-center gap-y-2">
                                                        <img src="/upload.svg" alt="upload" />
                                                        <div>
                                                            <span className="text-primary underline">Click to upload</span>
                                                            <span className="ml-1">or drag and drop</span>
                                                        </div>
                                                    </div>
                                                )}

                                                <input
                                                    id="file-upload"
                                                    type="file"
                                                    name="image"
                                                    onChange={handleImageUpload}
                                                    className="hidden"
                                                />
                                            </label>
                                        </div>
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Name"
                                            value={newCategory.name}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
                                        />
                                        <input
                                            type="text"
                                            name="color"
                                            placeholder="Color"
                                            value={newCategory.color}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
                                        />
                                        <input
                                            type="text"
                                            name="description"
                                            placeholder="Description"
                                            value={newCategory.description}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
                                        />
                                        <label className="flex items-center ml-2 mb-4">
                                            <input
                                                type="checkbox"
                                                name="featured"
                                                checked={newCategory.featured}
                                                onChange={(e) => setNewCategory({
                                                    ...newCategory,
                                                    featured: e.target.checked
                                                })}
                                                className="mr-2 h-5 w-5 text-blue-500 border border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                            />
                                            Featured
                                        </label>

                                        <input
                                            type="number"
                                            name="order"
                                            placeholder="Order"
                                            value={newCategory.order}
                                            onChange={handleInputChange}
                                            className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
                                        />
                                        <div className="flex justify-between gap-x-3 mt-4">
                                            <button
                                                onClick={() => setAddCategory(false)}
                                                className="bg-gray-300 rounded-lg px-10 py-2 transition duration-150 hover:bg-gray-400"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                onClick={handleAddCategory}
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
                                        <th className="py-4 px-6 text-center">Image</th>
                                        <th className="py-4 px-6 text-center">Name</th>
                                        <th className="py-4 px-6 text-center">Color</th>
                                        <th className="py-4 px-6 text-center">Description</th>
                                        <th className="py-4 px-6 text-center">Featured</th>
                                        <th className="py-4 px-6 text-center">Order</th>
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
                                            <td className="text-center">
                                                <span className={`px-2 py-1 rounded ${category.featured ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                                    {category.featured ? 'Yes' : 'No'}
                                                </span>
                                            </td>
                                            <td className="font-medium text-center">{category.order}</td>
                                            <td className="py-4 px-6 text-center">{formatDate(category.updatedAt)}</td>
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
