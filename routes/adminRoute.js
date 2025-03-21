import express from "express";
import { adminDesbord } from "../controller/AdminController.js";
import "../connnection/db.connection.js"
var route  = express.Router()

route.get("/deshboard",adminDesbord)

export default route