// import mongoose from "mongoose";
// import "../connnection/db.connection.js"
// import mongooseUniqueValidator from "mongoose-unique-validator";

// const businessSchema  = mongoose.Schema({
//     business_id: { type: String, required: true, unique: true }, // Unique Business ID
//     business_name: { type: String, required: [true,"Business name is mandetory"], trim: true},
//     owner_name: { type: String, required: true, trim: true },
//     owner_token : {type:String},
//     user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
//     email: { type: String, required: [true,"email is mendetory"], unique: true, lowercase: true,trim: true  },
//     contact_info: { type: String, required: [true ,"contact number is mendetory"], trim: true },
//     address: { type: String, required: [true,"address is mandetory"]},
//     category: { type: String, required: [true,"cetegory name is mendetory"]}, // Example: "Plumbing", "Cleaning"
//     registration_number: { type: String, unique: true }, // Optional business registration number
//     description: { type: String},
//     business_logo: { type: String }, // Optional website URL
//     status: {
//         type: String,
//         enum: ["pending", "approved", "rejected"],
//         default: "pending",
//     },
//     created_at: { type: Date, default: Date.now },
// }) 

// const businessSchemaModel =  businessSchema.plugin(mongooseUniqueValidator); //using mongoose unique validatore
// const Business = mongoose.model("Business", businessSchemaModel);
// export default Business     ;

import mongoose from "mongoose";
import '../connnection/db.connection.js'
import mongooseUniqueValidator from "mongoose-unique-validator";

const businessSchema = new mongoose.Schema({
    business_id: { type: Number, required: true, unique: true },
    business_name: { type: String, required: true, trim: true },
    owner_name: { type: String, required: true, trim: true },
    user_id: { type: Number, ref: "user_collections", required: true }, // Store user_id as a Number
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    contact_info: { type: String, required: true, trim: true },
    address: { type: String, required: true },
    category: { type: String, required: true },
    registration_number: { type: String, unique: true },
    description: { type: String },
    business_logo: { type: String },
    status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" },
    created_at: { type: Date, default: Date.now },
});

// Apply mongoose unique validator plugin
businessSchema.plugin(mongooseUniqueValidator);

const Business = mongoose.model("business_collections", businessSchema);
export default Business;
