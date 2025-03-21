
import '../connnection/db.connection.js';
import Business from "../model/businessModel.js";
import User from "../model/userModel.js"; // Import User Model
import { fileURLToPath } from "url";
import { dirname } from "path";
import url from "url"
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

// Save Business
export const saveBusiness = async (req, res) => {
    try {
        let business_details = req.body;
        console.log("Received business data:",business_details);
        // Generate business_id efficiently
        var business_list = await Business.find();
        var len = business_list.length;
        var business_id = len==0 ? 1 : business_list[len-1].business_id+1; 
        
        // Handle image upload if present
        if (req.files) {
                let image_file = req.files.business_image
                let image_name = Date.now()+ " " +rs.generate()+" "+ image_file.name;
                let uploadPath = path.join(__dirname,"../../ui/public/upload/business_image",image_name)
                image_file.mv(uploadPath)              
        }

        business_details = {...business_details,"business_id":business_id,"status":"pending"}
        var savedBusiness = await Business.create(business_details);

        res.status(201).json({ status: true, message: "Business created successfully", business: savedBusiness });
    } catch (err) {
        console.error("Error saving business:", err);

        // Handle Validation & Duplicate Errors
        if (err.name === "ValidationError") {
            return res.status(400).json({ status: false, message: "Validation failed", error: err.message });
        }
        if (err.code === 11000) {
            return res.status(400).json({ status: false, message: "Duplicate entry", error: err.keyValue });
        }

        res.status(500).json({ status: false, message: "Internal server error", error: err.message });
    }
};

// Update Business
export const updateBusiness = async (req, res) => {
    try {
        const { business_id } = req.params; // Extract business_id from URL
        const updateBusinessData = req.body;

        console.log("Updating business:", business_id, "with data:", updateBusinessData);

        // Check if the business exists
        let business = await Business.findOne({ business_id });

        if (!business) {
            return res.status(404).json({ status: false, message: "Business not found" });
        }

        // Update provided fields
        Object.keys(updateBusinessData).forEach(key => {
            business[key] = updateBusinessData[key];
        });

        // Save updated business
        let updatedBusiness = await business.save();

        res.status(200).json({
            status: true,
            message: "Business updated successfully",
            business: updatedBusiness
        });

    } catch (err) {
        console.error("Error updating business:", err);
        res.status(500).json({ status: false, message: "Internal server error", error: err.message });
    }
};

// View All Businesses
export const viewBusiness = async (req, res) => {
    try {
        const businesses = await Business.find(); // Ensure async operation is handled
        res.status(200).json({ status: true, message: "Data fetched successfully", businesses });
    } catch (err) {
        console.error("Error fetching businesses:", err);
        res.status(500).json({ status: false, message: "Data not found", error: err.message });
    }
};


// // Search Businesses with Filters
export const searchBusiness = async(req,res,nest)=>{
    const cat_name = req.query
console.log(cat_name.catagory_name);
var b_data  = await Business.find({catagory_name:{ $regex :cat_name.business_name,$options:'i'}})

if(b_data.length != 0){
    res.status(200).json({"status":true,"message":"data fetch succeffully","category":b_data})
}
else{
    res.status(200).json({"status":false,"message":"data not found"})

}
}