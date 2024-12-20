import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/navBar";
import Header from "../Header/header";
import axios from "axios";

export default function Providers() {
    const [search, setSearch] = useState("");
    const [selectedProviderType, setSelectedProviderType] = useState("");
    const [address, setAddress] = useState("");
    const [range, setRange] = useState("");
    const [providerTypes, setProviderTypes] = useState([]);
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

        const fetchProviders = async () => {
            try {
                const response = await axios.get(`https://karyana-backend.vercel.app/get-providers`);
                console.log('Fetched Serive Providers:', response.data);
                setProviderList(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        const fetchProviderTypes = async () => {
            try {
                const response = await axios.get(`https://karyana-backend.vercel.app/get-provider-types`);
                setProviderTypes(response.data);
            } catch (error) {
                console.error('Error fetching provider types:', error);
            }
        };

        fetchProviderTypes();
        fetchProviders();
    }, []);

    const handleServiceInputChange = (e) => {
        const { name, value } = e.target;
        setNewServiceProvider({
            ...newServiceProvider,
            [name]: value,
        });
    };

    const handleAddServiceProvider = async () => {
        const newServiceProviderData = {
            ...newServiceProvider,
            image: newServiceProvider.image || "/dp-user.png",
        };
        console.log("New Service Provider Data:", newServiceProviderData);
        try {
            const response = await axios.post(`https://karyana-backend.vercel.app/add-providers`, newServiceProviderData, {
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

    const filteredServiceProviders = providerList.filter((provider) => {
        const matchesName = provider.name?.toLowerCase().includes(search.toLowerCase());
        const matchesProviderType = selectedProviderType
            ? provider.providerType === selectedProviderType
            : true;
        const matchesAddress = address
            ? String(provider.addresses || "")
                .toLowerCase()
                .includes(address.toLowerCase())
            : true;
        const matchesRange = range
            ? String(provider.availableRange || "")
                .toLowerCase()
                .includes(range.toLowerCase())
            : true;

        return matchesName && matchesProviderType && matchesAddress && matchesRange;
    });

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
            <div className="min-h-screen ml-60 bg-gray-100 px-8 py-5">

                <div className="mt-4">
                    <div>
                        <h1 className="font-bold text-xl my-6">Service Providers</h1>
                        <div className="flex w-full justify-end">
                            <div className="flex gap-x-3 text-sm justify-center items-center flex-wrap">

                                <div className="flex px-1 py-1.5 rounded-xl bg-white space-x-3">
                                    <img src="/Search.png" alt="Search" className="ml-2" />
                                    <input
                                        type="text"
                                        placeholder="Search by Name"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="outline-none"
                                    />
                                </div>

                                <div className="flex pl-3 pr-1 py-2.5 rounded-xl bg-white space-x-3">
                                    <select
                                        className="outline-none bg-transparent"
                                        value={selectedProviderType}
                                        onChange={(e) => setSelectedProviderType(e.target.value)}
                                    >
                                        <option value="">All Provider Types</option>
                                        {providerTypes.map((type) => (
                                            <option key={type._id} value={type.name}>
                                                {type.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex pl-3 py-2 rounded-xl bg-white space-x-3">
                                    <input
                                        type="text"
                                        placeholder="Search by Address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        className="outline-none"
                                    />
                                </div>

                                <div className="flex pl-3 py-2 rounded-xl bg-white space-x-3">
                                    <input
                                        type="text"
                                        placeholder="Search by Available Range"
                                        value={range}
                                        onChange={(e) => setRange(e.target.value)}
                                        className="outline-none"
                                    />
                                </div>

                                <button
                                    onClick={() => setAddServiceProvider(true)}
                                    className="bg-[#89b8ff] rounded-xl flex items-center px-3 text-primary font-bold"
                                >
                                    <span className="text-2xl mb-1 mr-2">+</span> Add Service Provider
                                </button>
                            </div>

                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full border-separate border-spacing-y-3 text-xs">
                                <thead>
                                    <tr className="text-gray-500 font-semibold text-left ">
                                        <th className="py-2 pr-3">Profile</th>
                                        <th className="py-2 px-3">Provider Type</th>
                                        <th className="py-2 px-3">Phone No</th>
                                        <th className="py-2 px-3">Addresses</th>
                                        <th className="py-2 px-3">Available Range</th>
                                        <th className="py-2 px-3">Taxes</th>
                                        <th className="py-2 px-3">Available</th>
                                        <th className="py-2 px-3">Accepted</th>
                                        <th className="py-2 px-3">Updated At</th>
                                        <th className="py-2 px-3"></th>
                                    </tr>
                                </thead>
                                <tbody className="border border-gray-200">
                                    {filteredServiceProviders.map((provider) => (
                                        <tr key={provider.id} className="border-t bg-white hover:bg-gray-100 rounded-lg">
                                            <td className="pl-2">
                                                <div className="flex gap-x-3 items-center">
                                                    <img src={provider.image} alt={provider.name} className="w-12 h-12" />
                                                    <div className="space-y-1">
                                                        <div>
                                                            {provider.name}
                                                        </div>
                                                        <div className="text-gray-600">
                                                            {provider.mobileNumber}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-2 px-3">{provider.providerType}</td>
                                            <td className="py-2 px-3">{provider.phNumber}</td>
                                            <td className="py-2 px-3">{provider.addresses}</td>
                                            <td className="py-2 px-3">{provider.availableRange}</td>
                                            <td className="py-2 px-3">{provider.taxes}</td>
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
                                            <td className="py-2 px-3">{formatDate(provider.updatedAt)}</td>
                                            <td className="py-2 px-3 text-right">
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
                </div >
            </div >
        </>
    );
}
