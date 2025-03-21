import express from 'express'
const route = express.Router();
import * as categroyController from '../controller/categoryController.js'

route.post("/saveCategory",categroyController.saveCategory);
route.get("/ViewCategory",categroyController.readCategory);
route.put("/updateCategory/:category_id",categroyController.updateCategory);
route.delete("/deleteCategory",categroyController.deleteCategory);
route.get("/searchCategory",categroyController.searchCategory);

export default route;