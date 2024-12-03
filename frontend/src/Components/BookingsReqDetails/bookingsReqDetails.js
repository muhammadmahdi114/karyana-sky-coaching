import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import NavBar from '../NavBar/navBar';
import Header from '../Header/header';

const BookingReqDetails = () => {
    const { bookingId } = useParams();
    const [bookingDetails, setBookingDetails] = useState(null);
    const [activeTab, setActiveTab] = useState('details');
    const [paymentStatus, setPaymentStatus] = useState('');
    const [scheduleDate, setScheduleDate] = useState('');
    const [provider, setProvider] = useState(null);
    const [providers, setProviders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookingDetails = async () => {
            try {
                const response = await axios.get(`${import.meta.env.backend_baseUrl}/get-booking-details/${bookingId}`);
                setBookingDetails(response.data);
                setPaymentStatus(response.data.paymentStatus);
                setScheduleDate(response.data.scheduleDate);
            } catch (error) {
                console.error('Error fetching booking details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookingDetails();
    }, [bookingId]);

    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await axios.get(`${import.meta.env.backend_baseUrl}/get-providers`);
                setProviders(response.data);
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        };

        fetchProviders();
    }, []);

    const isBookingDone = new Date(bookingDetails?.scheduleDate) < new Date();

    const formatBookingDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: 'short',
            year: '2-digit',
        }).format(date);

        const formattedTime = date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });

        return `${formattedDate} at ${formattedTime}`;
    };

    const handlePaymentStatusChange = async (status) => {
        try {
            await axios.put(`${import.meta.env.backend_baseUrl}/update-payment-status/${bookingId}`, {
                paymentStatus: status,
            });
            setPaymentStatus(status);
        } catch (error) {
            console.error('Error updating payment status:', error);
        }
    };


    const handleScheduleDateChange = async (newDate) => {
        try {
            await axios.put(`${import.meta.env.backend_baseUrl}/update-schedule-date/${bookingId}`, {
                scheduleDate: newDate,
            });
            setScheduleDate(newDate);
        } catch (error) {
            console.error('Error updating schedule date:', error);
        }
    };

    const handleAssignProvider = async () => {
        try {
            await axios.put(`${import.meta.env.backend_baseUrl}/assign-provider/${bookingId}`, {
                providerId: provider,
            });
            alert('Provider assigned successfully');
        } catch (error) {
            console.error('Error assigning provider:', error);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <NavBar />
            <Header />
            <div className="min-h-screen ml-60 bg-gray-100 p-8">
                <h1 className="text-2xl font-bold">Booking Details</h1>
                <div className="flex items-center mt-6 mb-3 gap-x-5">
                    <h2 className="text-xl text-primary font-semibold">Booking # {bookingDetails.bookingId}</h2>
                    <p
                        className={`${isBookingDone ? 'bg-green-500 text-white' : 'bg-red-400 text-white'
                            } py-1 px-2 rounded-sm`}
                    >
                        {isBookingDone ? 'Done' : 'Pending'}
                    </p>
                </div>
                <p className="text-gray-500 text-sm">
                    Booking Placed: {bookingDetails?.bookingDate && formatBookingDate(bookingDetails?.bookingDate)}
                </p>

                <div className="flex gap-x-1 mt-3 mb-5">
                    <button
                        onClick={() => setActiveTab('details')}
                        className={`py-2 px-4 rounded-xl ${activeTab === 'details' ? 'bg-primary text-white' : ''}`}
                    >
                        Details
                    </button>
                    <button
                        onClick={() => setActiveTab('status')}
                        className={`py-2 px-4 rounded-xl ${activeTab === 'status' ? 'bg-primary text-white' : ''}`}
                    >
                        Status
                    </button>
                </div>

                <div className="flex gap-x-5 justify-between">
                    <div className="bg-white w-2/3 p-6 rounded-lg shadow-md">
                        {activeTab === 'details' ? (
                            <>
                                <div className="flex w-full justify-between items-center mb-16">
                                    <div className="space-y-2">
                                        <h2>Payment Method</h2>
                                        <p className="text-primary">Not defined</p>
                                        <p>
                                            Amount: <span className="text-primary">{bookingDetails.totalAmount}</span>
                                        </p>
                                    </div>
                                    <div className="text-end space-y-2">
                                        <h2>
                                            Payment Status:
                                            <span
                                                className={`${paymentStatus === 'Paid'
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-red-400 text-white'
                                                    } py-1 px-2 rounded-sm ml-2`}
                                            >
                                                {paymentStatus}
                                            </span>
                                        </h2>
                                        <p>Booking Otp: 361441</p>
                                        <p>Schedule Date: {scheduleDate && formatBookingDate(scheduleDate)}</p>
                                    </div>
                                </div>
                                <p className="px-2 py-4 w-full bg-blue-100 rounded-lg">
                                    <span className="text-primary"># Note: </span>
                                    Customer's Note
                                </p>
                                <div className="mt-6">
                                    <h2 className="text-lg font-semibold mb-4">Booking Summary</h2>
                                    <div className="bg-white p-4 rounded-lg shadow-md">
                                        <table className="w-full text-sm text-left">
                                            <thead className="text-xs text-gray-700 uppercase bg-gray-200">
                                                <tr>
                                                    <th className="px-6 py-3">Service</th>
                                                    <th className="px-6 py-3">Price</th>
                                                    <th className="px-6 py-3">Qty</th>
                                                    <th className="px-6 py-3">Discount</th>
                                                    <th className="px-6 py-3">Vat</th>
                                                    <th className="px-6 py-3">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="bg-white border-b">
                                                    <td className="px-6 py-4">
                                                        <span className="font-bold">Rent Ambulance</span>
                                                        <br />
                                                        Emergency-Ambulance
                                                    </td>
                                                    <td className="px-6 py-4">0</td>
                                                    <td className="px-6 py-4">0</td>
                                                    <td className="px-6 py-4">0</td>
                                                    <td className="px-6 py-4">0</td>
                                                    <td className="px-6 py-4">{bookingDetails.totalAmount}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className='w-full flex flex-col items-end'>
                                            <div className="mt-6 w-1/2 space-y-2">
                                                <div className="flex justify-between">
                                                    <div className="w-2/3 text-gray-700">Service Amount (Vat Excluded):</div>
                                                    <div className="w-1/3 text-right">0$</div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="w-2/3 text-gray-700">Service Discount:</div>
                                                    <div className="w-1/3 text-right">0$</div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="w-2/3 text-gray-700">Coupon Discount:</div>
                                                    <div className="w-1/3 text-right">0$</div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="w-2/3 text-gray-700">Campaign Discount:</div>
                                                    <div className="w-1/3 text-right">0$</div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="w-2/3 text-gray-700">Referral Discount:</div>
                                                    <div className="w-1/3 text-right">0$</div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="w-2/3 text-gray-700">Vat / Tax:</div>
                                                    <div className="w-1/3 text-right">0$</div>
                                                </div>
                                                <div className="flex justify-between">
                                                    <div className="w-2/3 text-gray-700">Service Fee:</div>
                                                    <div className="w-1/3 text-right">0$</div>
                                                </div>
                                                <div className="flex justify-between mt-4">
                                                    <div className="w-2/3 text-gray-700">Grand Total:</div>
                                                    <div className="w-1/3 text-right font-semibold text-gray-900">{bookingDetails.totalAmount}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex w-full justify-between items-center mb-16">
                                    <div className="space-y-2">
                                        <h2>Payment Method</h2>
                                        <p className="text-primary">Not defined</p>
                                        <p>
                                            Amount: <span className="text-primary">{bookingDetails.totalAmount}</span>
                                        </p>
                                    </div>
                                    <div className="text-end space-y-2">
                                        <h2>
                                            Payment Status:
                                            <span
                                                className={`${paymentStatus === 'Paid'
                                                    ? 'bg-green-500 text-white'
                                                    : 'bg-red-400 text-white'
                                                    } py-1 px-2 rounded-sm ml-2`}
                                            >
                                                {paymentStatus}
                                            </span>
                                        </h2>
                                        <p>Schedule Date: {scheduleDate && formatBookingDate(scheduleDate)}</p>
                                    </div>
                                </div>
                                <div className='flex w-full items-center justify-center gap-x-5 mt-10 pt-10 border-t'>
                                    <img src='/tick.svg' alt='Done' className='h-20'/>
                                    <div>
                                        <h2 className='font-semibold'>Booking Placed</h2>
                                        <p className='text-gray-400'>{bookingDetails.bookingDate && formatBookingDate(bookingDetails.bookingDate)}</p>
                                        <p className='text-gray-400'>By: {bookingDetails.customerId.name}</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="text-lg font-semibold mb-4">Booking Setup</h2>

                        <div className="mb-6 flex w-full justify-between items-center">
                            <label className="block text-sm font-medium">Payment Status</label>
                            <select
                                className="w-1/2 px-3 py-2 border rounded-md text-gray-700 focus:outline-none"
                                value={paymentStatus}
                                onChange={(e) => handlePaymentStatusChange(e.target.value)}
                            >
                                <option value="Paid">Paid</option>
                                <option value="Unpaid">Unpaid</option>
                            </select>
                        </div>

                        <div className="flex items-center mx-6 mb-2">
                            <input
                                type="datetime-local"
                                value={scheduleDate}
                                onChange={(e) => handleScheduleDateChange(e.target.value)}
                                className="border rounded-md px-3 py-2 text-gray-700 w-full"
                            />

                            <button className=" text-gray-500">
                                <i className="far fa-calendar-alt"></i>
                            </button>
                        </div>

                        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-semibold flex items-center mb-2">
                                <i className="fas fa-user mr-2"></i> Customer Information
                            </h3>
                            <div className="flex items-center">
                                <img
                                    src={bookingDetails.customerId.image}
                                    alt={bookingDetails.customerId.name}
                                    className="w-12 h-12 rounded-full mr-4"
                                />
                                <div>
                                    <p className="text-sm font-medium">{bookingDetails.customerId.name}</p>
                                    <p className="text-sm text-gray-600">{bookingDetails.customerId.phNumber}</p>
                                    <p className="text-sm text-gray-600">Customer Address</p>
                                </div>
                            </div>
                        </div>

                        <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-semibold flex items-center mb-2">
                                <i className="fas fa-user-tie mr-2"></i> Provider Information
                            </h3>
                            <div className="text-center">
                                <label className="block text-sm font-medium mb-2">Assign Provider</label>
                                <select
                                    className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none"
                                    value={provider}
                                    onChange={(e) => {
                                        setProvider(e.target.value);
                                    }}
                                >
                                    <option value="">Select Provider</option>
                                    {providers.map((prov) => (
                                        <option key={prov._id} value={prov._id}>
                                            {prov.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    onClick={handleAssignProvider}
                                    className="mt-3 py-2 px-4 bg-blue-500 text-white rounded-lg"
                                > Assign
                                </button>
                            </div>

                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <h3 className="text-sm font-semibold flex items-center mb-2">
                                <i className="fas fa-user-cog mr-2"></i> Serviceman Information
                            </h3>
                            <div className="text-center">
                                <p className="text-sm text-gray-600">No Serviceman Information</p>
                                <button className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-md">
                                    Assign Serviceman
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default BookingReqDetails;
