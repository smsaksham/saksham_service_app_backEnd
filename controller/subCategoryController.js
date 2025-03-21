import '../connnection/db.connection.js'
import url from 'url'
import subCategorySchemaModel from '../model/subCategoryModel.js';
import categorySchemaModel from '../model/categoryModel.js'

export var saveSubCategory = async (req, res) => {
  try {
    const { category_id , sub_category_name, } = req.body;
    console.log("Request Data:", category_id, sub_category_name);

    if (!category_id || !sub_category_name) {
      return res.status(400).json({ message: "Category ID and Subcategory Name are required" });
    }

    // Check if the category exists using findById
    const categoryExists = await categorySchemaModel.findById(category_id);
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }
    console.log("Category Found:", categoryExists);

    // Find the last subcategory and generate a new subcategory_id
    const lastSubcategory = await subCategorySchemaModel.findOne().sort({ subcategory_id: -1 });
    const subcategory_id = lastSubcategory ? lastSubcategory.subcategory_id + 1 : 1;

    // Create and save the new subcategory
    const subcategory = new subCategorySchemaModel({
      category_id: category_id,
      category_name: categoryExists.category_name, // Ensuring category_name is stored
      sub_category_name,
      subcategory_id,
    });

    await subcategory.save();

    return res.status(201).json({ message: "Subcategory created successfully", subcategory });

  } catch (error) {
    console.error("Error creating subcategory:", error);
    return res.status(500).json({ error: error.message });
  }
};

export var readSubCategory =async(req,res)=>{
    var obj = req.query
    var sub_cat_list = await subCategorySchemaModel.find(obj);
    var len = sub_cat_list.length;
    if(len>0)
    {
       var resp = res.status(200).json({"status":true,"sub_category_List":sub_cat_list,"message":"Sub Cat List Found"});
       return resp;
    }
    else
    {
     var resp = res.status(202).json({"status":false,"message":"sub cat list not found"});
     return resp;
    }

}
export var viewAllSubCategorys = async(req,res)=>{
  try{

    var resp  = await subCategorySchemaModel.find()
    res.status(200).json({"status":true,"message":"data fetch sunccessfully ","data":resp })

  }catch(err){
    res.status(500).json({"status":false,"message":"data not found"})
  }

}
export var updateSubCategory =async(req,res)=>{
  try{
    const {subCategory_id} = req.params;
    const {sub_category_name} = req.body;
    const updateSubCategory = await subCategorySchemaModel.findByIdAndUpdate(
       subCategory_id,
       {sub_category_name},
       {new: true}
    );
    if(!updateSubCategory){
      return res.status(404).json({
        status:false,
        message:"subCategory not found",
      });
    }
    res.status(200).json({
      status:true,
      message:"subCategory updated successfully",
      category:updateSubCategory,
    });
  }
  catch(error){
    res.status(500).json({
      status:false,
      message:"server error",
      error:error.message,
    });
  }
    
}
export var deleteSubCategory =async(req,res)=>{
  var {subcategory_id} = req.body;
  var sub_cat_list = await subCategorySchemaModel.find(subcategory_id);
  var len = sub_cat_list.length;
  console.log("subcategory id : ",subcategory_id);
  
  if(len>0)
  {
     let result = await subCategorySchemaModel.deleteOne(subcategory_id);
     if(result)
        return res.status(200).json({"status":true,"message":"sub Category Successfuly  delete"});
    else
    return res.status(500).json({"status":false,"Error":"Server Not Found"});
  }
  else
  {
     var resp = res.status(202).json({"status":false,"sub_category_List":"sub cat Name not found"});
     return resp;
  }
    
}


export var searchSubCategory = async (req, res) => {
  try {
    const { sub_category_name } = req.query;

    if (!sub_category_name) {
      return res.status(400).json({
        status: false,
        message: "Subcategory name is required for search",
      });
    }

    // Search for subcategories using case-insensitive regex
    const subCategories = await subCategorySchemaModel.find({
      sub_category_name: { $regex: sub_category_name, $options: "i" },
    });

    if (subCategories.length > 0) {
      return res.status(200).json({
        status: true,
        message: "Subcategories found",
        subCategories,
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "No subcategories found matching the search term",
      });
    }
  } catch (error) {
    console.error("Error searching subcategory:", error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      error: error.message,
    });
  }
};