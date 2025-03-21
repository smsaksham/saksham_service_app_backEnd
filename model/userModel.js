import mongoose from "mongoose";
import '../connnection/db.connection.js'
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true
    },
    name:{
        type:String,
        require:[true,"Name is Required"],
        lowercase:true,
        trim:true
    },
    email:{
        type:String,
        require:[true,"Email is Required"],
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        require:[true,"Password is Required"],
        trim:true
    },
    contact:{
        type:String,
        require:[true,"Contact is Required"],
        maxlength:10,
        minlenght:10,
        unique:true,
        trim:true
    },
    gender:{
        type:String,
        require:[true,"Gender is Requried"]
    },
    role:{
        type:String,
    },
    status:Number,
    info:String
});
userSchema.plugin(mongooseUniqueValidator); //using mongoose unique validatore
const userSchemaModel = mongoose.model("user_collections",userSchema);
export default userSchemaModel;
