import "../connnection/db.connection.js"
import express from "express"
import { saveBusiness, searchBusiness, updateBusiness, viewBusiness } from "../controller/businessController.js"
const route = express.Router()

route.post("/saveBusiness",saveBusiness);
route.put("/updateBusiness",updateBusiness);
route.get("/viewAllBusiness",viewBusiness);
route.get("/serachBusiness",searchBusiness);

export default route;