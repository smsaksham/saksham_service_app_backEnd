import express from "express";
import { createService, viewAllServices, ViewServiceDetails } from "../controller/serviceController.js";
const router = express.Router();

router.post("/saveServices", createService);
router.get("/viewAllServices", viewAllServices);
router.get("/service-details/:service_id", ViewServiceDetails);

export default router