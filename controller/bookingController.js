import '../connnection/db.connection.js';
import BookingModel from '../model/bookingModel.js';

// Create a new booking
export const saveBooking = async (req, res) => {
    try {
        const bookingDetails = req.body;
        const bookingList = await BookingModel.find();
        const len = bookingList.length;
        const booking_id = len === 0 ? 1 : bookingList[len - 1].booking_id + 1;
        
        const newBooking = { ...bookingDetails, booking_id };
        await BookingModel.create(newBooking);
        res.status(200).json({ status: true, message: "Booking saved successfully" });
    } catch (err) {
        res.status(500).json({ status: false, message: "Booking not saved", error: err.message });
    }
};

// Read all bookings
export const readBookings = async (req, res) => {
    try {
        const bookingList = await BookingModel.find();
        if (bookingList.length !== 0) {
            res.status(200).json({ status: true, message: "Booking list data", bookingList });
        } else {
            res.status(200).json({ status: false, message: "No bookings available" });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: "Server error", error: error.message });
    }
};

// Fetch all bookings for a specific user
export const UserBookings = async (req, res, next) => {
    try {
        const { user_id } = req.query;

        if (!user_id) {
            return res.status(400).json({ status: false, message: "User ID is required" });
        }

        const userBookings = await BookingModel.find({ user_id });

        if (userBookings.length > 0) {
            res.status(200).json({ status: true, message: "User bookings fetched successfully", bookingList: userBookings });
        } else {
            res.status(200).json({ status: false, message: "No bookings found for this user" });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: "Server error", error: error.message });
    }
};


// Update a booking status
export const updateBooking = async (req, res) => {
    try {
        const { booking_id } = req.params;
        const { status } = req.body;
        const updatedBooking = await BookingModel.findByIdAndUpdate(booking_id, { status, updated_at: Date.now() }, { new: true });
        
        if (!updatedBooking) {
            return res.status(404).json({ status: false, message: "Booking not found" });
        }
        res.status(200).json({ status: true, message: "Booking updated successfully", booking: updatedBooking });
    } catch (error) {
        res.status(500).json({ status: false, message: "Server error", error: error.message });
    }
};

// Delete a booking
export const deleteBooking = async (req, res) => {
    try {
        const { booking_id } = req.params;
        const deletedBooking = await BookingModel.findByIdAndDelete(booking_id);
        
        if (!deletedBooking) {
            return res.status(404).json({ status: false, message: "Booking not found" });
        }
        res.status(200).json({ status: true, message: "Booking deleted successfully" });
    } catch (error) {
        res.status(500).json({ status: false, message: "Server error", error: error.message });
    }
};

// Search booking by service name
export const searchBooking = async (req, res) => {
    try {
        const { service_name } = req.query;
        if (!service_name) {
            return res.status(400).json({ status: false, message: "Service name is required" });
        }
        const bookings = await BookingModel.find({ service_name: { $regex: service_name, $options: 'i' } });
        if (bookings.length !== 0) {
            res.status(200).json({ status: true, message: "Bookings found", bookings });
        } else {
            res.status(200).json({ status: false, message: "No bookings found" });
        }
    } catch (error) {
        res.status(500).json({ status: false, message: "Server error", error: error.message });
    }
};