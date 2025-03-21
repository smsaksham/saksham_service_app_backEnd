import express from 'express'
import { AllOrders, getallpaymentDetails, getPaymentDetails, initiatePayment, verifyPayment } from '../controller/paymentController.js';

const route = express.Router();

route.post("/orderPayment",initiatePayment)
route.post("/verifyPayment",verifyPayment)
route.get("/Allorders",AllOrders)
route.get("/viewAllPayment",getPaymentDetails)
route.get("/viewAllPaymentDetails",getallpaymentDetails)

export default route;