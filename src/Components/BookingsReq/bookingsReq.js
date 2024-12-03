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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get(`https://karyana-backend.vercel.app/get-bookings-req`);
                setBookingList(response.data);                
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
                console.log("User: ", usersResponse.data);
                console.log("Provider: ", providersResponse.data);
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

    return (
        <>
            <NavBar />
            <Header />
            <div className="min-h-screen ml-60 bg-gray-100 px-8 py-5">
                <div className="mt-4">
                    <div>
                        <div className="flex w-full justify-between">
                            <h1 className="font-bold text-2xl my-6">Bookings</h1>
                            <button
                                onClick={() => document.getElementById("addBookingForm").classList.toggle("hidden")}
                                className="bg-blue-500 text-white px-6 py-2 rounded-md"
                            >
                                Add Booking Request
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

                        <div className="overflow-x-auto mt-8">
                            <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="text-gray-500 font-semibold text-left">
                                        <th className="py-4 px-6 text-center">Booking ID</th>
                                        <th className="py-4 px-6 text-center">Booking Date</th>
                                        <th className="py-4 px-6 text-center">Schedule Date</th>
                                        <th className="py-4 px-6 text-center">Customer Info</th>
                                        <th className="py-4 px-6 text-center">Provider Info</th>
                                        <th className="py-4 px-6 text-center">Total Amount</th>
                                        <th className="py-4 px-6 text-center">Payment Status</th>
                                        <th className="py-4 px-6 text-center">Updated At</th>
                                        <th className="py-4 px-6 text-center"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookingList.map((booking) => (
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
                                                        className="w-6 h-6 text-gray-700 border-2 rounded-lg hover:bg-gray-300"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M12 6.75v.008m0 10.492V17.25M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z"
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
