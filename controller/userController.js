import '../connnection/db.connection.js'
import userSchemaModel from "../model/userModel.js";
import rs from "randomstring";
import sendUserMail from "./emailController.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// admin id's to check only this matched id's make them admin
var AdminIds = ["admin1","admin2","admin3","admin4"];
// store otp for checking the varification
var SentOtp = {};
// register user method.
export let registerUser = async(req,res,next)=>{
    let userDetails = req.body;
    let pass = userDetails.password;
    // make hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(pass, salt);
    console.log("Hashed password:", hashedPassword);
    // set hash password in our database 
    userDetails.password = hashedPassword;
    // id auto incriment 
    var user_list = await userSchemaModel.find();
    console.log("users list is :",user_list);
    var len = user_list.length;
    console.log(len);
    var user_id = len==0 ? 1 : user_list[len-1].user_id+1;   
    console.log(user_id);
    
    var admin = req.body.AdminIds;
    console.log(admin);
    //check if user is admin or not      
    if(AdminIds.includes(admin)){
        userDetails = {...userDetails,"user_id":user_id,"role":"Admin","status":0,"info":Date()};
    }else if(req.body.ServiceProvider){
        userDetails = {...userDetails,"user_id":user_id,"role":"ServiceProvider","status":0,"info":Date()};
    }
    else{
        userDetails = {...userDetails,"user_id":user_id,"role":"User","status":0,"info":Date()};     
    }
    try{
        var resp = await userSchemaModel.create(userDetails);
            var otp  = rs.generate({
                length:6,
                charset:"numeric"
            });
            // send mail on user 
            SentOtp.email = otp;
            console.log("stored otp:",SentOtp.email);
            sendUserMail(resp.email,otp);
            req.session.user_otp = otp;         
            req.session.save();
            // send response on console or body
            // res.cookie("otp",otp)
            res.cookie("otp", otp, {
                path: "/",
                maxAge: 1000 * 60 * 5,  // Expires in 5 minutes
                httpOnly: true,
                secure: true,
                sameSite: "Lax"
            }); 
            res.status(200).json({"status":true,"message":"user insert","user":resp,"otp":otp,"AdminId":admin});
    }
    catch(err){
        res.status(200).json({"status":false,"message":"user not inserted","error":err});
    }   
}  
    //login user method.  
export let loginUser = async (req,res)=>{
    let {email,password} = req.body
    try{
        var user_list = await userSchemaModel.find({email})   
        var isMatch = await bcrypt.compare(password,user_list[0].password)
        if(isMatch || user_list.length != 0){
                var key = rs.generate()
                var payload = {"subject":user_list[0].email ,"subject2":user_list[0].user_id};
                var token = jwt.sign(payload,key)
                res.cookie('token',token)
                res
                .status(200)
                .json({"status":true,"message":"Log in successfully","user":user_list[0],"token":token})
            }
        else{
            res.status(200).json({"status":false,"message":"Invalid email and password"})
        }
    }
    catch(err){
        res.status(200).json({"status":false,"message":"Invalid email and password"})
    }
}
// otp verification
export var otpVarification = (req, res, next) => {
    const userOtp = req.body.otp;
    const sessionOtp = req.session?.user_otp;
    console.log("User OTP:", userOtp);
    console.log("stored otp is : :", SentOtp.email);
    if(userOtp === SentOtp.email) {
        SentOtp.email = null; // Clear the OTP from the session
        res.status(200).json({ status: true, message: "OTP verified successfully"});
    }else {
        res.status(200).json({ status: false, message: "Invalid OTP" });
    }
};

export let forgetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;

        console.log("Email received:", email);
        console.log("New password received:", newPassword);

        // Find user by email
        let userData = await userSchemaModel.findOne({ email });
        console.log(userData);

        if (!userData) {
            return res.status(400).json({ status: false, message: "Invalid email" });
        }
        

        // Hashing new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        console.log("Hashed Password:", hashedPassword);

        // Update password
        userData.password = hashedPassword;
        await userData.save();

        console.log("New password set successfully for", email);
        res.status(200).json({ status: true, message: "Password changed successfully" });

    } catch (err) {
        console.error("Error resetting password:", err);
        res.status(500).json({ status: false, message: "Internal server error", error: err.message });
    }
};

export var emailVerify = async(req,res,next)=>{
        const {email} = req.body
        try{
            var resp = await userSchemaModel.findOne({email});
                if(resp){

                    var otp  = rs.generate({
                        length:6,
                        charset:"numeric"
                    });
                    // send mail on user 
                    SentOtp.email = otp;
                    console.log("stored otp:",SentOtp.email);
                    sendUserMail(resp.email,otp);
                    req.session.user_otp = otp;         
                    req.session.save();
                    // send response on console or body
                    // res.cookie("otp",otp)
                    res.cookie("otp", otp, {
                        path: "/",
                        maxAge: 1000 * 60 * 5,  // Expires in 5 minutes
                        httpOnly: true,
                        secure: true,
                        sameSite: "Lax"
                    }); 
                    res.status(200).json({"status":true,"message":"email verifyed","user":resp,"otp":otp});
                }
                else{
                    return res.status(200).json({"status":false,"message":"email not found or invalid email"})
                }
        }
        catch(err){
            res.status(200).json({"status":false,"message":"user not inserted","error":err});
        }   
}

export var changePassword = async(req,res,next)=>{
    try {
        const { token ,oldPassword , newPassword } = req.body;

        console.log("old received:", oldPassword);
        console.log("New password received:", newPassword);
        // jwt incription or find user
        const decodedPayload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        console.log("Decoded Payload:", decodedPayload);
        // Find user by email
        var email = decodedPayload.subject
        let userData = await userSchemaModel.findOne({ email });
        console.log("user data is ",userData);
        
        if (!userData) {
            return res.status(400).json({ status: false, message: "Invalid email" });
        }
        console.log(userData.length);
        
        var pass = userData.password
        console.log("/pass is :  ",pass);
        
        var isMatch = await bcrypt.compare(oldPassword,userData.password);
        console.log("is match is : ",isMatch);
        
        if(!isMatch ){
            return res.status(200).json({status:false,"message": "old password is not correct if you not remember it old password please click on forget password"})
        }

        // Hashing new password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(newPassword, salt)

        console.log("Hashed Password:", hashedPassword);

        // Update password
        userData.password = hashedPassword;
        await userData.save();

        console.log("New password set successfully for", email);
        res.status(200).json({ status: true, message: "Password changed successfully" });

    } catch (err) {
        console.error("Error resetting password:", err);
        res.status(200).json({ status: false, message: "Internal server error", error: err.message });
    }
}

// file upload
export var uploadFile = async(req,res)=>{
    var user_details = req.body
    var img_file = req.files.image_file
    // console.log("image file is ",JSON.stringify(img_file));
    console.log(user_details.name);
    // get file name files return a object and file.name to get file name 
    // var img_file_name = Date.now()+img_file.name  
    // console.log("file name is ",img_file_name);
    var img_name = Date.now()+"_"+rs.generate()+"_"+img_file.name 
    // console.log("image name is : ",img_name);
    user_details = {...user_details,'image_file':img_name}
    console.log("user details is : ",user_details);
    try{
        const resp = await userSchemaModel.create(user_details);
        console.log("response is :",resp);
        console.log(__dirname);
        var upload_path = path.join(__dirname,"../upload",img_name) 
        // console.log(upload_path);
        img_file.mv(upload_path)
        res.status(200).json({"status":true,"message":"file uploaded successfully","user":resp})
    }catch(err){
        res.status(204).json({"status":false,"message":"file uploaded   "})
    } 
    
}

// delete user
export const deleteUser = async(req,res,next)=>{
    try{
        var user_id = req.body
        console.log('user id is : ',user_id);
        var user_list = await userSchemaModel.deleteMany(user_id)
        res.status(200).json({"status":true,"message":"user delete successfully ."})

    }catch(err){
        res.status(200).json({"status":true,"message":"user delete unsuccessfully .","error":err})

    }
}