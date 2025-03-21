import '../connnection/db.connection.js'
import Business from '../model/businessModel.js'
import categorySchemaModel from '../model/categoryModel.js'
import subCategorySchemaModel from '../model/subCategoryModel.js'
import userSchemaModel from "../model/userModel.js"

export var adminDesbord = async(req,res,next)=>{  
        try{
                var total_user = await userSchemaModel.find()
                var total_businesses = await Business.find()
                var total_category = await categorySchemaModel.find()
                var total_subCategory = await subCategorySchemaModel.find()
                res.status(200).json({"status":true,"message":"fetch data successfully","total_user":total_user,
                "total_businesses":total_businesses,"total_category":total_category,"total_subCategory":total_subCategory})
        }catch(err){
                res.status(200).json({"status":false,"message":"data not found","error":err})
        }
}
