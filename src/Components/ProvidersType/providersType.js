import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/navBar';
import Header from '../Header/header';

export default function ProvidersType() {
    const [search, setSearch] = useState('');
    const [menuOpen, setMenuOpen] = useState(null);
    const [addProviderType, setAddProviderType] = useState(false);
    const [newProviderType, setNewProviderType] = useState({
        name: '',
        commission: '',
        disabled: false,
    });

    const [providerTypeList, setProviderTypeList] = useState([]);

    useEffect(() => {
        const fetchProviderTypes = async () => {
            try {
                const response = await axios.get(`https://karyana-backend.vercel.app/get-provider-types`);
                setProviderTypeList(response.data);
            } catch (error) {
                console.error('Error fetching provider types:', error);
            }
        };

        fetchProviderTypes();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setNewProviderType({
            ...newProviderType,
            [name]: newValue,
        });
    };

    const handleAddProviderType = async () => {
        const newProviderTypeData = {
            ...newProviderType,
            commission: parseFloat(newProviderType.commission), // Ensure it's a number
            updatedAt: new Date().toISOString(),
        };

        try {
            const response = await axios.post(`https://karyana-backend.vercel.app/add-provider-types`, newProviderTypeData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setProviderTypeList([...providerTypeList, response.data]);
            setAddProviderType(false);
            setNewProviderType({
                name: '',
                commission: '',
                disabled: false,
            });
        } catch (error) {
            console.error('Error adding provider type:', error);
        }
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const toggleMenu = (id) => {
        setMenuOpen(menuOpen === id ? null : id);
    };

    const filteredProviderTypes = providerTypeList.filter((providerType) =>
        providerType.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <>
            <NavBar />
            <Header />
            <div className="min-h-screen ml-60 bg-gray-100 px-8 py-5">
                <h1 className="font-bold text-2xl my-6">Providers Type</h1>
                <div className="flex w-full justify-end items-center space-x-3 mb-2">
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
                        onClick={() => setAddProviderType(true)}
                        className="bg-[#89b8ff] h-12 rounded-xl flex items-center px-5 py-4 text-primary font-bold"
                    >
                        <span className="text-2xl mb-1 mr-2">+</span> Add Provider Type
                    </button>
                </div>
                {addProviderType && (
                    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-xl shadow-lg w-80 max-h-[90vh] overflow-y-auto">
                            <h2 className="py-4 px-6 text-lg font-bold mb-4 text-start border-b-2 ">Add Provider Type</h2>
                            <div className="px-6">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={newProviderType.name}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
                                />
                                <input
                                    type="number"
                                    name="commission"
                                    placeholder="Commission"
                                    value={newProviderType.commission}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 rounded-xl p-3 mb-4 w-full"
                                />
                                <label className="flex items-center ml-2 mb-4">
                                    <input
                                        type="checkbox"
                                        name="disabled"
                                        checked={newProviderType.disabled}
                                        onChange={(e) => setNewProviderType({
                                            ...newProviderType,
                                            disabled: e.target.checked
                                        })}
                                        className="mr-2 h-5 w-5 text-blue-500 border border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                    />
                                    Disabled
                                </label>
                                <div className="flex justify-between gap-x-3 mt-4 mb-4">
                                    <button
                                        onClick={() => setAddProviderType(false)}
                                        className="bg-gray-300 rounded-lg px-10 py-2 transition duration-150 hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleAddProviderType}
                                        className="bg-blue-500 text-white rounded-lg px-12 py-2 transition duration-150 hover:bg-blue-600"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {/* {addProviderType && (
          <div className="bg-white p-4 rounded-xl mb-4">
            <input type="text" name="name" value={newProviderType.name} onChange={handleInputChange} placeholder="Name" required />
            <input type="number" name="commission" value={newProviderType.commission} onChange={handleInputChange} placeholder="Commission" required />
            <label>
              Disabled
              <input type="checkbox" name="disabled" checked={newProviderType.disabled} onChange={handleInputChange} />
            </label>
            <button onClick={handleAddProviderType} className="bg-blue-500 text-white p-2 rounded">Add Provider Type</button>
          </div>
        )} */}
                <div className="overflow-x-auto">
                    <table className="min-w-full border-separate border-spacing-y-3 text-xs">
                        <thead>
                            <tr className="text-gray-500 font-semibold text-left">
                                <th className="py-2 px-3">Name</th>
                                <th className="py-2 px-3">Commission</th>
                                <th className="py-2 px-3">Disabled</th>
                                <th className="py-2 px-3">Updated At</th>
                                <th className="py-2 px-3"></th>
                            </tr>
                        </thead>
                        <tbody className=" bg-white border border-gray-200">
                            {filteredProviderTypes.map((type) => (
                                <tr key={type._id} className="border-t hover:bg-gray-100">
                                    <td className="py-2 px-3">{type.name}</td>
                                    <td className="py-2 px-3">{type.commission}</td>
                                    <td className="py-2 px-3">
                                        <span className={`px-2 py-1 rounded ${type.disabled ? 'bg-red-500 text-white' : 'bg-green-500 text-white'}`}>
                                            {type.disabled ? 'Yes' : 'No'}
                                        </span>
                                    </td>
                                    <td className="py-2 px-3">{formatDate(type.updatedAt)}</td>
                                    <td className="py-2 px-3 text-right">
                                        <button className="focus:outline-none" onClick={() => toggleMenu(type._id)}>
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
                                        {menuOpen === type._id && (
                                            <div className="absolute right-0 z-10 mt-2 w-48 bg-white rounded-lg shadow-lg">
                                                <ul>
                                                    <li
                                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => alert(`Edit ${type.name}`)}
                                                    >
                                                        Edit
                                                    </li>
                                                    <li
                                                        className="px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer"
                                                        onClick={() => alert(`Delete ${type.name}`)}
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
        </>
    );
}
