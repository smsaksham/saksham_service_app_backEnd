import '../connnection/db.connection.js'
import categorySchemaModel from '../model/categoryModel.js'

export var saveCategory =async(req,res)=>{
    var categoryDetails = req.body;

    var categoryList =await categorySchemaModel.find();

    var len = categoryList.length;

    var _id = len == 0 ? 1 :categoryList[len-1]._id+1;

    categoryDetails = {...categoryDetails,"_id":_id};

    try
    {
       var resp = await categorySchemaModel.create(categoryDetails);
       res.status(200).json({"status":true,"message":"Category Save"});
    }
    catch(err)
    {
        res.status(200).json({"status":false,"message":"Category Not Save","error":err});
    }

}

export var readCategory =async (req,res)=>{
  var categoryList = await categorySchemaModel.find();
    if(categoryList.length != 0)
    {
        res.status(200).json({"status":true,"message":"Category List Data ","categoryList":categoryList})
    }
    else
    {
        res.status(200).json({"status":false,"message":"Category Data Not Available"})
    }


}
export var updateCategory =async(req,res)=>{
  try{
    const {category_id} = req.params;
    const {category_name} = req.body;
    const updateCategory = await categorySchemaModel.findByIdAndUpdate(
       category_id,
       {category_name},
       {new: true}
    );
    if(!updateCategory){
      return res.status(404).json({
        status:false,
        message:"category not found",
      });
    }
    res.status(200).json({
      status:true,
      message:"category updated successfully",
      category:updateCategory,
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
export var deleteCategory =async (req,res)=>{
  var {_id} = req.body;
   var cat_list = await categorySchemaModel.find(_id);
   var len = cat_list.length;
   if(len>0)
   {
      let result = await categorySchemaModel.deleteOne(_id);
      if(result)
         return res.status(200).json({"status":true,"message":"Category Successfuly  delete"});
     else
     return res.status(500).json({"status":false,"Error":"Server Not Found"});
   }
   else
   {
      var resp = res.status(202).json({"status":false,"category_List":"cat Name not found"});
      return resp;
   }
    
}
export var searchCategory = async(req,res,next)=>{
    const  cat_name  = req.query.category_name;  // Get the search query from query params
    console.log("Category Name is : "+cat_name);
   try{
     
    if (!cat_name) {
        return res.status(400).json({ message: 'Search query is required' });
      }
   // Use a regular expression to search for categories that match the query (case-insensitive)
   const cat = await categorySchemaModel.find({
    category_name: { $regex: cat_name, $options: 'i' } // 'i' for case-insensitive search
  });

  console.log("Cat Type is : "+typeof cat);
  console.log("Length : "+cat.length);
  if(cat.length != 0 )
  {
    res.status(200).json({"status":true,"message":"search Category Found","category":cat});
  }
  else
  {
    res.status(200).json({"status":false,"message":"search Category Not Found",});
  }

  
   }catch(err){
    res.status(500).json({ message: 'Internal Server Error' });
   }
}

  
  