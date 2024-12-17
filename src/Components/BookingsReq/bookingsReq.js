import React, { useState, useEffect } from 'react';
import NavBar from "../NavBar/navBar";
import Header from "../Header/header";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function BookingsReq() {
    const [bookingList, setBookingList] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [providers, setProviders] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [selectedProvider, setSelectedProvider] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [bookingDate, setBookingDate] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [providerName, setProviderName] = useState('');
    const [filteredBookingList, setFilteredBookingList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`https://karyana-backend.vercel.app/get-bookings-req`);
                setBookingList(response.data);
                setFilteredBookingList(response.data); // Initially show all bookings
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        const fetchUsersAndProviders = async () => {
            try {
                const usersResponse = await axios.get(`https://karyana-backend.vercel.app/get-users`);
                const providersResponse = await axios.get(`https://karyana-backend.vercel.app/get-providers`);
                setCustomers(usersResponse.data);
                setProviders(providersResponse.data);
            } catch (error) {
                console.error('Error fetching customers or providers:', error);
            }
        };

        fetchBookings();
        fetchUsersAndProviders();
    }, []);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString("en-US", options);
    };

    const handleAddBooking = async () => {
        try {
            const response = await axios.get(`https://karyana-backend.vercel.app/latest-booking-id`);
            const latestBookingId = response.data.latestBookingId;

            const newBookingId = latestBookingId + 1;

            const newBooking = {
                bookingId: newBookingId,
                bookingDate: new Date(),
                scheduleDate: scheduleDate,
                customerId: selectedCustomer,
                providerId: selectedProvider,
                totalAmount: 100,
                paymentStatus: 'Unpaid',
            };

            await axios.post(`https://karyana-backend.vercel.app/add-bookings-req`, newBooking);
            alert('Booking request created successfully!');
        } catch (error) {
            console.error('Error adding booking request:', error);
            alert('Error adding booking request.');
        }
    };

    const handleViewDetails = (bookingId) => {
        navigate(`/booking-details/${bookingId}`);
    };

    // Handle search filter logic
    const handleSearch = () => {
        let filteredBookings = bookingList;

        if (bookingDate) {
            filteredBookings = filteredBookings.filter((booking) =>
                formatDate(booking.bookingDate) === formatDate(bookingDate)
            );
        }

        if (scheduleDate) {
            filteredBookings = filteredBookings.filter((booking) =>
                formatDate(booking.scheduleDate) === formatDate(scheduleDate)
            );
        }

        if (selectedCustomer) {
            filteredBookings = filteredBookings.filter((booking) =>
                booking.customerId && booking.customerId._id === selectedCustomer
            );
        }

        if (selectedProvider) {
            filteredBookings = filteredBookings.filter((booking) =>
                booking.providerId && booking.providerId._id === selectedProvider
            );
        }

        if (customerName) {
            filteredBookings = filteredBookings.filter((booking) =>
                booking.customerId && booking.customerId.name.toLowerCase().includes(customerName.toLowerCase())
            );
        }

        if (providerName) {
            filteredBookings = filteredBookings.filter((booking) =>
                booking.providerId && booking.providerId.name.toLowerCase().includes(providerName.toLowerCase())
            );
        }

        setFilteredBookingList(filteredBookings);
    };

    return (
        <>
            <NavBar />
            <Header />
            <div className="min-h-screen ml-60 bg-gray-100 px-8 py-5">
                <div className="mt-4">
                    <div>
                        <div className="flex w-full justify-between items-center">
                            <h1 className="font-bold text-2xl my-6">Bookings</h1>
                            <button onClick={() => document.getElementById("addBookingForm").classList.toggle("hidden")} className="bg-[#89b8ff] h-9 rounded-xl flex items-center px-5 py-4 text-primary font-bold">
                                <span className="text-2xl mb-1 mr-2">+</span>Add Booking Request
                            </button>
                        </div>

                        <div id="addBookingForm" className="hidden mt-4">
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h2 className="font-bold text-xl mb-4">Create Booking Request</h2>
                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label className="block text-gray-700">Select Customer</label>
                                        <select
                                            value={selectedCustomer}
                                            onChange={(e) => setSelectedCustomer(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-md"
                                        >
                                            <option value="">-- Select Customer --</option>
                                            {customers.map((customer) => (
                                                <option key={customer._id} value={customer._id}>
                                                    {customer.name} ({customer.phoneNumber})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Select Provider</label>
                                        <select
                                            value={selectedProvider}
                                            onChange={(e) => setSelectedProvider(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-md"
                                        >
                                            <option value="">-- Select Provider --</option>
                                            {providers.map((provider) => (
                                                <option key={provider._id} value={provider._id}>
                                                    {provider.name} ({provider.phoneNumber})
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-gray-700">Schedule Date</label>
                                        <input
                                            type="date"
                                            value={scheduleDate}
                                            onChange={(e) => setScheduleDate(e.target.value)}
                                            className="w-full px-4 py-2 border rounded-md"
                                        />
                                    </div>
                                    <button
                                        onClick={handleAddBooking}
                                        className="bg-green-500 text-white px-6 py-2 rounded-md mt-4"
                                    >
                                        Submit Request
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Search Filters */}
                        <div className="mt-8">
                            <h2 className="font-semibold mb-2">Search Bookings</h2>
                            <div className="flex gap-4">
                                <input
                                    type="date"
                                    value={bookingDate}
                                    onChange={(e) => setBookingDate(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Search by Booking Date"
                                />
                                <input
                                    type="date"
                                    value={scheduleDate}
                                    onChange={(e) => setScheduleDate(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Search by Schedule Date"
                                />
                                <input
                                    type="text"
                                    value={customerName}
                                    onChange={(e) => setCustomerName(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Search by Customer Name"
                                />
                                <input
                                    type="text"
                                    value={providerName}
                                    onChange={(e) => setProviderName(e.target.value)}
                                    className="w-full px-4 py-2 border rounded-md"
                                    placeholder="Search by Provider Name"
                                />
                                <button
                                    onClick={handleSearch}
                                    className="bg-blue-500 text-white px-6 py-2 rounded-md"
                                >
                                    Search
                                </button>
                            </div>
                        </div>

                        {/* Bookings Table */}
                        <div className="overflow-x-auto mt-8">
                            <table className="min-w-full border-separate border-spacing-y-3 text-xs">
                                <thead>
                                    <tr className="text-gray-500 font-semibold text-left">
                                        <th className="py-2 px-3 text-center">Booking ID</th>
                                        <th className="py-2 px-3 text-center">Booking Date</th>
                                        <th className="py-2 px-3 text-center">Schedule Date</th>
                                        <th className="py-2 px-3 text-center">Customer Info</th>
                                        <th className="py-2 px-3 text-center">Provider Info</th>
                                        <th className="py-2 px-3 text-center">Total Amount</th>
                                        <th className="py-2 px-3 text-center">Payment Status</th>
                                        <th className="py-2 px-3 text-center">Updated At</th>
                                        <th className="py-2 px-3 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody className=" bg-white border border-gray-200">
                                    {filteredBookingList.map((booking) => (
                                        <tr key={booking.bookingId} className="border-t hover:bg-gray-100">
                                            <td className="font-medium text-center">{booking.bookingId}</td>
                                            <td className="font-medium text-center">{formatDate(booking.bookingDate)}</td>
                                            <td className="font-medium text-center">{formatDate(booking.scheduleDate)}</td>
                                            <td className="text-center">
                                                {booking.customerId ? `${booking.customerId.name} (${booking.customerId.phNumber})` : "N/A"}
                                            </td>
                                            <td className="text-center">
                                                {booking.providerId ? `${booking.providerId.name} (${booking.providerId.phNumber})` : "N/A"}
                                            </td>
                                            <td className="text-center">{booking.totalAmount}</td>
                                            <td className="text-center">{booking.paymentStatus}</td>
                                            <td className="text-center">{formatDate(booking.updatedAt)}</td>
                                            <td className="text-right relative">
                                                <button
                                                    className="focus:outline-none"
                                                    onClick={() => handleViewDetails(booking.bookingId)}
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="w-6 h-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M15.232 7.232a3 3 0 014.24 4.24M17.25 3.75l3.5 3.5M11.25 5.25L4.5 12m0 0l6.75 6.75m-6.75-6.75h12"
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
                </div>
            </div>
        </>
    );
}
