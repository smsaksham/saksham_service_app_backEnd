import express from "express";
import { createService, viewAllServices } from "../controller/serviceController.js";
const router = express.Router();

router.post("/saveServices", createService);
router.get("/viewAllServices", viewAllServices);

export default router