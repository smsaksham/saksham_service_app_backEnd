import mongoose from "mongoose";
import "../connnection/db.connection.js"
const ServiceSchema =  mongoose.Schema(
  {
    service_id : {type: Number,unique:true},
    business_id: { type: String, required: true,ref:"business_collections" },
    subcategory_name: { type: String, required: true,ref:"subCategoryCollection" },
    // subcategory_id: { type: String, required: true,ref:"subCategoryCollection" },
    service_name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    service_image: {type: String,unique:true},
  },
  { timestamps: true }
);

 var ServiceSchemaModel =  mongoose.model("Service_Collections", ServiceSchema);
export default ServiceSchemaModel