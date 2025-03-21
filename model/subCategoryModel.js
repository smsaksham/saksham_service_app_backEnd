import mongoose from "mongoose";
import '../connnection/db.connection.js';
import mongooseUniqueValidator from "mongoose-unique-validator";
//create schema
const subCategorySchema = mongoose.Schema({
    subcategory_id:Number,
    category_id:{
      type:Number,
      ref: "category_collections",
      required:[true,"Category Name is Required"],
      lowercase:true,
      trim:true,
      },
    sub_category_name:{
        type:String,
        required:[true,"SubCategory name is required"],
        trim:true,
    },
    created_at: {
        type: Date,
        default: Date.now,  // Automatically sets the current date when a new subcategory is created
      },
    updated_at: {
        type: Date,
        default: Date.now,  // Automatically sets the current date on creation
      },
    
})
//apply to uniqueValidator plugin to user Schema
subCategorySchema.plugin(mongooseUniqueValidator);

const subCategorySchemaModel = mongoose.model('subCategoryCollection',subCategorySchema);
export default subCategorySchemaModel;