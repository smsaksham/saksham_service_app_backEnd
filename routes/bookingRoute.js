import express from 'express'
import { saveBooking } from '../controller/bookingController.js';
import { readBookings } from '../controller/bookingController.js';
const route = express.Router();

route.post("/saveBooking",saveBooking)
route.get("/getAllBookings",readBookings)
route.get("/UserBooking",readBookings)

export default route;