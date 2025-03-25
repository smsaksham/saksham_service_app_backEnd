import express from 'express'
import { deleteBooking, saveBooking, updateBooking } from '../controller/bookingController.js';
import { readBookings } from '../controller/bookingController.js';
const route = express.Router();

route.post("/saveBooking",saveBooking)
route.get("/getAllBookings",readBookings)
route.get("/UserBooking",readBookings)
route.delete("/deleteBooking",deleteBooking)
route.put("/updateBooking",updateBooking)

export default route;