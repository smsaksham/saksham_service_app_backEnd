import mongoose from "mongoose";
import "../connnection/db.connection.js"

const paymentSchema = new mongoose.Schema({
    payment_id: { type: String, unique: true },
    booking_id: { type: Number,ref: "Booking",required: true },
    amount: { type: Number, required: true },
    payment_method: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Success", "Failed"], default: "Pending" },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const paymentSchemaModel = mongoose.model("Payment", paymentSchema);
export default paymentSchemaModel
