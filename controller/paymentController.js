// import '../connnection/db.connection.js';
// import Payment from "../model/paymentModel.js"
// import rs from "randomstring"
// import Razorpay from 'razorpay'

// const razorpay = new Razorpay({
//     key_id: "rzp_test_FZQ5WW1k0Tv6R4",
//     key_secret: "BsLoSvlmsFCrpJKI0rglm39O"
// });

// // var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

// export const initiatePayment = async (req, res) => {    
//     try {
//         const { booking_id, amount, payment_method } = req.body;

//         // Create Razorpay Order
//         const options = {
//             amount: amount * 100, // Convert to paise
//             currency: "INR",
//             receipt: rs.generate(),
//             payment_capture: 1
//         };

//         const order = await razorpay.orders.create(options);

//         // Save payment details in the database
//         const payment = new Payment({
//             payment_id: order.id,
//             booking_id,
//             amount,
//             payment_method,
//             status: "Pending"
//         });

//         await payment.save();

//         res.status(201).json({
//             status: "success",
//             message: "Payment initiation successful",
//             payment,
//             status_code: 201
//         });
//     } catch (error) {
//         console.error("Payment initiation failed:", error);
//         res.status(500).json({
//             status: "error",
//             message: "Payment initiation failed",
//             error: error.message
//         });
//     }
// };



// export const AllOrders = async (req, res, next) => {
//     try {
//         var resp = await razorpay.orders.all(); // Pass options correctly

//         res.status(200).json({
//             status: true,
//             message: "Payment data fetched successfully",
//             data: resp
//         });
//     } catch (err) {
//         console.error("Error fetching orders:", err);
//         res.status(500).json({
//             status: false,
//             message: "Failed to fetch payment data",
//             error: err.message
//         });
//     }
// };
import '../connnection/db.connection.js';
import Payment from "../model/paymentModel.js";
import rs from "randomstring";
import Razorpay from 'razorpay';
import crypto from "crypto";


// 🔹 Initialize Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_FZQ5WW1k0Tv6R4",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "BsLoSvlmsFCrpJKI0rglm39O"
});

export const initiatePayment = async (req, res) => {
    try {
        const { booking_id, amount, payment_method } = req.body;

        // ✅ Create Razorpay Order
        const options = {
            amount: amount * 100, // Convert to paise
            currency: "INR",
            receipt: rs.generate(),
            payment_capture: 1
        };

        const order = await razorpay.orders.create(options);

        // ✅ Save payment details in DB
        const payment = new Payment({
            payment_id: order.id,
            booking_id,
            amount,
            payment_method,
            status: "Pending"
        });

        await payment.save();

        res.status(201).json({
            status: "success",
            message: "Payment initiation successful",
            payment,
            order,
            status_code: 201
        });
    } catch (error) {
        console.error("Payment initiation failed:", error);
        res.status(500).json({
            status: "error",
            message: "Payment initiation failed",
            error: error.message
        });
    }
};

export const verifyPayment = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        // ✅ Verify payment signature
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return res.status(400).json({ status: "error", message: "Payment verification failed" });
        }

        // ✅ Update payment status in DB
        await Payment.findOneAndUpdate(
            { payment_id: razorpay_order_id },
            { status: "Completed", transaction_id: razorpay_payment_id },
            { new: true }
        );

        res.status(200).json({ status: "success", message: "Payment verified successfully" });
    } catch (error) {
        console.error("Payment verification failed:", error);
        res.status(500).json({ status: "error", message: "Payment verification failed", error: error.message });
    }
};

export const AllOrders = async (req, res) => {
    try {
        const options = {
            from: Math.floor(Date.now() / 1000) - 30 * 24 * 60 * 60, // Last 30 days
            to: Math.floor(Date.now() / 1000),
            count: 10,
        };

        const resp = await razorpay.orders.all(options);

        res.status(200).json({
            status: true,
            message: "Payment data fetched successfully",
            data: resp
        });
    } catch (err) {
        console.error("Error fetching orders:", err);
        res.status(500).json({
            status: false,
            message: "Failed to fetch payment data",
            error: err.message
        });
    }
};

export const getPaymentDetails = async (req, res) => {
    try {
        const { _id } = req.body;
        console.log(_id);
        
        const payment = await Payment.findOne({ payment_id: _id });

        if (!payment) {
            return res.status(404).json({ status: false, message: "Payment not found" });
        }

        res.status(200).json({ status: true, data: payment });
    } catch (error) {
        console.error("Error fetching payment details:", error);
        res.status(500).json({
            status: false,
            message: "Failed to fetch payment details",
            error: error.message
        });
    }
};

export const getallpaymentDetails = async(req,res)=>{
    var resp = await Payment.find()
    res.status(200).json({
        status: true,
        message: " fetch payment details",
        "resp":resp
    });
}