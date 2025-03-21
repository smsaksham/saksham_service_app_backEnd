import mongoose from "mongoose";
import '../connnection/db.connection.js'
const bookingSchema = new mongoose.Schema(
    {
        booking_id: { type: String, required: true, unique: true }, // Unique Booking ID
        user_id: { type: Number, ref: "user_collections", required: true }, // Customer ID
        business_id: { type: Number, ref: "business_collections", required: true }, // Service Provider ID
        service_name: { type: String, required: true }, // Example: "Plumbing Service"
        booking_date: { type: Date, required: true }, // Date of booking
        status: {
            type: String,
            enum: ["pending", "confirmed", "completed", "cancelled"],
            default: "pending",
        },
        price: { type: Number, required: true }, // Service price
        payment_status: {
            type: String,
            enum: ["pending", "paid", "failed"],
            default: "pending",
        },
        created_at: { type: Date, default: Date.now }, // Booking timestamp
    },
    { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
