import React, { useState } from "react";
import NavBar from "../NavBar/navBar";
import Header from "../Header/header";

export default function Providers() {
    const [activeButton, setActiveButton] = useState("users");
    const [search, setSearch] = useState("");
    const [searchCity, setSearchCity] = useState("City");
    const [searchStatus, setSearchStatus] = useState("Status");
    const users = [
        {
            id: 1,
            name: "John Doe",
            image: "/dp-user.png",
            email: "doe@gmail.com",
            type: "Karyana",
            phNumber: "03312312323",
            availableRange: "10KMs",
            availability: true,
            accept: true,
        },
        {
            id: 2,
            name: "Jane Smith",
            image: "/dp-user.png",
            email: "smith@gmail.com",
            type: "Grocery",
            phNumber: "03312345678",
            availableRange: "15KMs",
            availability: true,
            accept: true,
        },
        {
            id: 3,
            name: "Mike Johnson",
            image: "/dp-user.png",
            email: "johnson@gmail.com",
            type: "Bakery",
            phNumber: "03312387654",
            availableRange: "12KMs",
            availability: true,
            accept: false,
        },
    ];

    const [userList, setUserList] = useState(users);
    const [addUser, setAddUser] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        type: "",
        phNumber: "",
        availableRange: "",
        availability: true,
        accept: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({
            ...newUser,
            [name]: value,
        });
    };

    const handleAddUser = () => {
        const newUserData = { ...newUser, id: userList.length + 1, image: "/dp-user.png" };
        setUserList([...userList, newUserData]);
        setAddUser(false);
        setNewUser({ name: "", email: "", type: "", phNumber: "", availableRange: "", availability: true, accept: false });
    };

    const serviceProvidersData = [
        {
            id: 1,
            image: "/dp-user.png",
            name: "Alice Brown",
            providerType: "Plumber",
            phNumber: "03312345679",
            mobileNumber: "03312345680",
            addresses: "123 Street, City",
            availableRange: "20KMs",
            taxes: "5%",
            availability: true,
            accepted: true,
            updatedAt: "2024-10-20",
        },
        {
            id: 2,
            image: "/dp-user.png",
            name: "Bob White",
            providerType: "Electrician",
            phNumber: "03312345681",
            mobileNumber: "03312345682",
            addresses: "456 Avenue, City",
            availableRange: "25KMs",
            taxes: "7%",
            availability: false,
            accepted: false,
            updatedAt: "2024-10-21",
        },
    ];

    const filteredUsers = users.filter((user) => {
        const matchesName = user.name.toLowerCase().includes(search.toLowerCase());
        const matchesCity = searchCity === "City" || user.type.toLowerCase() === searchCity.toLowerCase();
        const matchesStatus = searchStatus === "Status" || (searchStatus === "active" ? user.availability : !user.availability);

        return matchesName && matchesCity && matchesStatus;
    });

    const filteredServiceProviders = serviceProvidersData.filter((provider) => {
        const matchesName = provider.name.toLowerCase().includes(search.toLowerCase());
        return matchesName;
    });

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
                                                <td className="py-4 px-6">
                                                    <input
                                                        type="checkbox"
                                                        checked={user.availability}
                                                        className="toggle-checkbox"
                                                    />
                                                </td>
                                                <td className="py-4 px-6">
                                                    <input
                                                        type="checkbox"
                                                        checked={user.accept}
                                                        className="toggle-checkbox"
                                                    />
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
                                    <div className="bg-white p-6 rounded-xl shadow-lg w-80">
                                        <h2 className="text-lg font-bold mb-4 text-center">Add User</h2>
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
                                        <td className="py-4 px-6">
                                            <input
                                                type="checkbox"
                                                checked={provider.availability}
                                                className="toggle-checkbox"
                                            />
                                        </td>
                                        <td className="py-4 px-6">
                                            <input
                                                type="checkbox"
                                                checked={provider.accepted}
                                                className="toggle-checkbox"
                                            />
                                        </td>
                                        <td className="py-4 px-6">{provider.updatedAt}</td>
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
                </div>
                    )}
            </div>
        </div >
        </>
    );
}
