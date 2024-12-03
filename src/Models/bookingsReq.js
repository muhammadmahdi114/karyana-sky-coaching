const mongoose = require("mongoose");

const bookingsReqSchema = new mongoose.Schema(
    {
        bookingId: {
            type: Number,
            unique: true,
            required: true,
        },
        bookingDate: {
            type: Date,
            required: true,
        },
        scheduleDate: {
            type: Date,
            required: true,
        },
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        providerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ServiceProvider',
            required: true
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ["Paid", "Unpaid"],
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("BookingsReq", bookingsReqSchema);
