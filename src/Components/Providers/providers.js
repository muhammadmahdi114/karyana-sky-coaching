import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/navBar";
import Header from "../Header/header";
import axios from "axios";

export default function Providers() {
    const [activeButton, setActiveButton] = useState("users");
    const [search, setSearch] = useState("");
    const [searchCity, setSearchCity] = useState("City");
    const [searchStatus, setSearchStatus] = useState("Status");
    const [providerTypes, setProviderTypes] = useState([]);
    const [userList, setUserList] = useState([]);
    const [addUser, setAddUser] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        image: "",
        email: "",
        providerType: "",
        phNumber: "",
        availableRange: "",
        availability: true,
        accept: false,
    });

    const [providerList, setProviderList] = useState([]);
    const [addServiceProvider, setAddServiceProvider] = useState(false);
    const [newServiceProvider, setNewServiceProvider] = useState({
        image: "",
        name: "",
        providerType: "",
        phNumber: "",
        mobileNumber: "",
        addresses: "",
        availableRange: "",
        taxes: "",
        availability: "",
        accepted: "",
    });

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get-users');
                console.log('Fetched users:', response.data);
                setUserList(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchProviders = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get-providers');
                console.log('Fetched Serive Providers:', response.data);
                setProviderList(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchProviderTypes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get-provider-types');
                setProviderTypes(response.data);
            } catch (error) {
                console.error('Error fetching provider types:', error);
            }
        };

        fetchProviderTypes();
        fetchUsers();
        fetchProviders();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value,
        });
    };

    const handleServiceInputChange = (e) => {
        const { name, value } = e.target;
        setNewServiceProvider({
            ...newServiceProvider,
            [name]: value,
        });
    };

    const handleAddUser = async () => {
        const newUserData = {
            ...newUser,
            id: userList.length + 1,
            image: newUser.image || "/dp-user.png",
        };
        console.log("New User Data:", newUserData);

        try {
            const response = await axios.post("http://localhost:8000/add-users", newUserData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            setUserList([...userList, response.data]);
            setAddUser(false);
            setNewUser({
                name: "",
                image: "",
                email: "",
                type: "",
                phNumber: "",
                availableRange: "",
                availability: true,
                accept: false,

            });
        } catch (error) {
            if (error.response) {
                console.error("Error in handleAddUser:", error.response.data);
            } else {
                console.error("Error in handleAddUser:", error.message);
            }
        }
    };


    const handleAddServiceProvider = async () => {
        const newServiceProviderData = {
            ...newServiceProvider,
            image: newServiceProvider.image || "/dp-user.png",
        };
        console.log("New Service Provider Data:", newServiceProviderData);
        try {
            const response = await axios.post("http://localhost:8000/add-providers", newServiceProviderData, {
                headers: { "Content-Type": "application/json" },
            });

            setProviderList([...providerList, response.data]);
            setAddServiceProvider(false);
            setNewServiceProvider({
                image: "",
                name: "",
                type: "",
                phNumber: "",
                mobileNumber: "",
                addresses: "",
                availableRange: "",
                taxes: "",
                availability: "",
                accepted: "",
            });
        } catch (error) {
            console.error("Error adding service provider:", error);
        }
    };

    const filteredUsers = userList.filter((user) => {
        const matchesName = user.name.toLowerCase().includes(search.toLowerCase());
        const matchesCity = searchCity === "City" || user.type.toLowerCase() === searchCity.toLowerCase();
        const matchesStatus = searchStatus === "Status" || (searchStatus === "active" ? user.availability : !user.availability);

        return matchesName && matchesCity && matchesStatus;
    });

    const filteredServiceProviders = providerList.filter((provider) => {
        const matchesName = provider.name.toLowerCase().includes(search.toLowerCase());
        return matchesName;
    });

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewUser({
                ...newUser,
                image: imageUrl,
            });
        }
    };

    const handleProviderImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setNewServiceProvider({
                ...newServiceProvider,
                image: imageUrl,
            });
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
            <div className="h-screen ml-60 bg-gray-100 px-8 py-5">
                <div className="bg-white pl-4 w-72 p-2 flex space-x-2 rounded">
                    <button
                        onClick={() => setActiveButton("users")}
                        className={`px-6 py-2 rounded-xl ${activeButton === "users" ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-800'}`}
                    >
                        Users
                    </button>
                    <button
                        onClick={() => setActiveButton("serviceProvider")}
                        className={`px-6 py-2 rounded-xl ${activeButton === "serviceProvider" ? 'bg-blue-500 text-white' : 'bg-transparent text-gray-800'}`}
                    >
                        Service Providers
                    </button>
                </div>

                <div className="mt-4">
                    {activeButton === "users" ? (
                        <div>
                            <div className="flex w-full justify-between">
                                <h1 className="font-bold text-2xl my-6">Users</h1>
                                <div className="flex gap-x-5 justify-center items-center">
                                    <div className="flex px-2 py-4 rounded-xl bg-white space-x-2">
                                        <img src="/Search.png" alt="Search" />
                                        <input
                                            type="text"
                                            placeholder="Search by name, role.."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                    <select value={searchCity} onChange={(e) => setSearchCity(e.target.value)} className="rounded-xl w-20 px-2 py-4 bg-white">
                                        <option value="City" disabled>City</option>
                                        <option value="all">All</option>
                                        <option value="karyana">Karyana</option>
                                        <option value="grocery">Grocery</option>
                                        <option value="bakery">Bakery</option>
                                    </select>
                                    <select value={searchStatus} onChange={(e) => setSearchStatus(e.target.value)} className="rounded-xl px-2 py-4 bg-white">
                                        <option value="Status" disabled>Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    <button onClick={() => { setAddUser(true) }} className="bg-[#89b8ff] h-12 rounded-xl flex items-center px-5 py-4 text-primary font-bold">
                                        <span className="text-2xl mb-1 mr-2">+</span> Add User
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr className="text-gray-500 font-semibold text-left">
                                            <th className="py-4 px-6">Name</th>
                                            <th className="py-4 px-6">Type</th>
                                            <th className="py-4 px-6">Phone No</th>
                                            <th className="py-4 px-6">Availability Range</th>
                                            <th className="py-4 px-6">Available</th>
                                            <th className="py-4 px-6">Accept</th>
                                            <th className="py-4 px-6"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers.map((user) => (
                                            <tr key={user.id} className="border-t hover:bg-gray-100">
                                                <td className="py-4 px-6 flex items-center">
                                                    <img
                                                        src={user.image}
                                                        alt={user.name}
                                                        className="w-10 h-10 rounded-full mr-4"
                                                    />
                                                    <div>
                                                        <p className="font-medium">{user.name}</p>
                                                        <p className="text-sm text-gray-500">{user.email}</p>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">{user.type}</td>
                                                <td className="py-4 px-6">{user.phNumber}</td>
                                                <td className="py-4 px-6">{user.availableRange}</td>
                                                <td className="text-center">
                                                    <span className={`px-2 py-1 rounded ${user.availability ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                                        {user.availability ? 'Yes' : 'No'}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <span className={`px-2 py-1 rounded ${user.accept ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                                        {user.accept ? 'Yes' : 'No'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6 text-right">
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
                            {addUser && (
                                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                    <div className="bg-white rounded-xl shadow-lg w-80 max-h-[90vh] overflow-y-auto">
                                        <h2 className="py-4 px-6 text-lg font-bold mb-4 text-start border-b-2 ">Add User</h2>
                                        <div className="px-6">
                                            <div className="flex flex-col items-center mb-6">
                                                <span className="w-full text-start mb-2">Profile Image</span>
                                                <label className="flex flex-col items-center justify-center w-full text-sm h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition duration-150">

                                                    {newUser.image ? (
                                                        <div className="mb-2">
                                                            <img src={newUser.image} alt="Uploaded" className="w-full h-40 object-cover rounded-xl" />

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
                                                value={newUser.name}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded-xl p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                            />
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Email"
                                                value={newUser.email}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded-xl p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                            />
                                            <input
                                                type="text"
                                                name="type"
                                                placeholder="Type"
                                                value={newUser.type}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded-xl p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                            />
                                            <input
                                                type="text"
                                                name="phNumber"
                                                placeholder="Phone Number"
                                                value={newUser.phNumber}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded-xl p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                            />
                                            <input
                                                type="text"
                                                name="availableRange"
                                                placeholder="Available Range"
                                                value={newUser.availableRange}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded-xl p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                            />
                                            <div className="flex justify-end gap-x-3 mt-4">
                                                <button
                                                    onClick={() => setAddUser(false)}
                                                    className="bg-gray-300 rounded-xl px-4 py-2 transition duration-150 hover:bg-gray-400"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleAddUser}
                                                    className="bg-blue-500 text-white rounded-xl px-6 py-2 transition duration-150 hover:bg-blue-600"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>
                    ) : (
                        <div>
                            <div className="flex w-full justify-between">
                                <h1 className="font-bold text-2xl my-6">Service Providers</h1>
                                <div className="flex gap-x-5 justify-center items-center">
                                    <div className="flex px-2 py-4 rounded-xl bg-white space-x-2">
                                        <img src="/Search.png" alt="Search" />
                                        <input
                                            type="text"
                                            placeholder="Search by name, role.."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                        />
                                    </div>
                                    <button onClick={() => { setAddServiceProvider(true) }} className="bg-[#89b8ff] h-12 rounded-xl flex items-center px-5 py-4 text-primary font-bold">
                                        <span className="text-2xl mb-1 mr-2">+</span> Add Service Provider
                                    </button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="min-w-full bg-white border border-gray-200">
                                    <thead>
                                        <tr className="text-gray-500 font-semibold text-left">
                                            <th className="py-4 px-6"></th>
                                            <th className="py-4 pr-6">Name</th>
                                            <th className="py-4 px-6">Provider Type</th>
                                            <th className="py-4 px-6">Phone No</th>
                                            <th className="py-4 px-6">Mobile No</th>
                                            <th className="py-4 px-6">Addresses</th>
                                            <th className="py-4 px-6">Available Range</th>
                                            <th className="py-4 px-6">Taxes</th>
                                            <th className="py-4 px-6">Available</th>
                                            <th className="py-4 px-6">Accepted</th>
                                            <th className="py-4 px-6">Updated At</th>
                                            <th className="py-4 px-6"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredServiceProviders.map((provider) => (
                                            <tr key={provider.id} className="border-t hover:bg-gray-100">
                                                <td className="py-4 px-6 flex items-center">
                                                    <img
                                                        src={provider.image}
                                                        alt={provider.name}
                                                        className="w-10 h-10 rounded-full mt-2 mr-10"
                                                    />
                                                </td>
                                                <td className="py-4 pr-6">{provider.name}</td>
                                                <td className="py-4 px-6">{provider.providerType}</td>
                                                <td className="py-4 px-6">{provider.phNumber}</td>
                                                <td className="py-4 px-6">{provider.mobileNumber}</td>
                                                <td className="py-4 px-6">{provider.addresses}</td>
                                                <td className="py-4 px-6">{provider.availableRange}</td>
                                                <td className="py-4 px-6">{provider.taxes}</td>
                                                <td className="text-center">
                                                    <span className={`px-2 py-1 rounded ${provider.availability ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                                        {provider.availability ? 'Yes' : 'No'}
                                                    </span>
                                                </td>
                                                <td className="text-center">
                                                    <span className={`px-2 py-1 rounded ${provider.accepted ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                                                        {provider.accepted ? 'Yes' : 'No'}
                                                    </span>
                                                </td>
                                                <td className="py-4 px-6">{formatDate(provider.updatedAt)}</td>
                                                <td className="py-4 px-6 text-right">
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
                            {addServiceProvider && (
                                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
                                    <div className="bg-white rounded-xl shadow-lg w-80 max-h-[90vh] overflow-y-auto">
                                        <h2 className="py-4 px-6 text-lg font-bold mb-4 text-start border-b-2 ">Add Service Provider</h2>
                                        <div className="px-6">
                                            <div className="flex flex-col items-center mb-6">
                                                <span className="w-full text-start mb-2">Profile Image</span>
                                                <label className="flex flex-col items-center justify-center w-full text-sm h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition duration-150">

                                                    {newServiceProvider.image ? (
                                                        <div className="mb-2">
                                                            <img src={newServiceProvider.image} alt="Uploaded" className="w-full h-40 object-cover rounded-xl" />

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
                                                        onChange={handleProviderImageUpload}
                                                        className="hidden"
                                                    />
                                                </label>
                                            </div>
                                            <input
                                                type="text"
                                                name="name"
                                                placeholder="Name"
                                                value={newServiceProvider.name}
                                                onChange={handleServiceInputChange}
                                                className="border border-gray-300 rounded-xl p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                            />
                                            <select
                                                name="providerType"
                                                value={newServiceProvider.providerType}
                                                onChange={handleServiceInputChange}
                                                className="border border-gray-300 rounded-xl p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                            >
                                                <option value="" disabled>
                                                    Select Provider Type
                                                </option>
                                                {providerTypes.map((type) => (
                                                    <option key={type._id} value={type.name}>
                                                        {type.name}
                                                    </option>
                                                ))}
                                            </select>

                                            {/* <input
                                                type="text"
                                                name="providerType"
                                                placeholder="Provider Type"
                                                value={newServiceProvider.providerType}
                                                onChange={handleServiceInputChange}
                                                className="border border-gray-300 rounded-xl p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                            /> */}
                                            <input
                                                type="number"
                                                name="phNumber"
                                                placeholder="Phone Number"
                                                value={newServiceProvider.phNumber}
                                                onChange={handleServiceInputChange}
                                                className="border border-gray-300 rounded-xl p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                            />
                                            <input
                                                type="number"
                                                name="mobileNumber"
                                                placeholder="Mobile Number"
                                                value={newServiceProvider.mobileNumber}
                                                onChange={handleServiceInputChange}
                                                className="border border-gray-300 rounded-xl p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                            />
                                            <input
                                                type="text"
                                                name="addresses"
                                                placeholder="Address"
                                                value={newServiceProvider.addresses}
                                                onChange={handleServiceInputChange}
                                                className="border border-gray-300 rounded-xl p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                            />
                                            <input
                                                type="text"
                                                name="availableRange"
                                                placeholder="Available Range"
                                                value={newServiceProvider.availableRange}
                                                onChange={handleServiceInputChange}
                                                className="border border-gray-300 rounded-xl p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                            />
                                            <input
                                                type="text"
                                                name="taxes"
                                                placeholder="Taxes "
                                                value={newServiceProvider.taxes}
                                                onChange={handleServiceInputChange}
                                                className="border border-gray-300 rounded-xl p-3 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
                                            />
                                            <label className="flex items-center ml-2 mb-4">
                                                <input
                                                    type="checkbox"
                                                    name="featured"
                                                    checked={newServiceProvider.availability}
                                                    onChange={(e) => setNewServiceProvider({
                                                        ...newServiceProvider,
                                                        availability: e.target.checked
                                                    })}
                                                    className="mr-2 h-5 w-5 text-blue-500 border border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                />
                                                Available
                                            </label>
                                            <div className="flex justify-end gap-x-3 mt-4">
                                                <button
                                                    onClick={() => setAddServiceProvider(false)}
                                                    className="bg-gray-300 rounded-xl px-4 py-2 transition duration-150 hover:bg-gray-400"
                                                >
                                                    Cancel
                                                </button>
                                                <button
                                                    onClick={handleAddServiceProvider}
                                                    className="bg-blue-500 text-white rounded-xl px-6 py-2 transition duration-150 hover:bg-blue-600"
                                                >
                                                    Save
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}
                        </div>
                    )}
                </div >
            </div >
        </>
    );
}
