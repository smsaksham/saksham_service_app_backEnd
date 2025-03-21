import mongoose from "mongoose";
import '../connnection/db.connection.js'
import mongooseUniqueValidator from "mongoose-unique-validator";
//create schema
const categorySchema = mongoose.Schema({
    _id:Number,
     
    category_name:{
        type: String,
        required: [true,'Category Name is Required'],
        unique:true,
        lowercase:true,
        trim:true
       },
    created_at: {
        type: Date,
        default: Date.now,  // Automatically sets the current date when a new category is created
      },
    updated_at: {
        type: Date,
        default: Date.now,  // Automatically sets the current date on creation
      },
    
})
//apply to uniqueValidator plugin to user Schema
categorySchema.plugin(mongooseUniqueValidator);
const categorySchemaModel = mongoose.model('category_collections',categorySchema);
export default categorySchemaModel;

