import express from 'express';
const route = express.Router();
import * as subCategoryController from '../controller/subCategoryController.js'

route.post("/saveSubCategory",subCategoryController.saveSubCategory);
route.get("/viewAllSubCategorys",subCategoryController.viewAllSubCategorys);
route.get("/readSubCategory",subCategoryController.readSubCategory);
route.get("/searchSubCategory",subCategoryController.searchSubCategory);
route.put("/updateSubCategory/:subCategory_id",subCategoryController.updateSubCategory);
route.delete("/deleteSubCategory",subCategoryController.deleteSubCategory);

export default route;
