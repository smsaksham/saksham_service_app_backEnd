import mongoose from "mongoose";
import "../connnection/db.connection.js"
import Service from "../model/serviceModel.js";
import ServiceSchemaModel from "../model/serviceModel.js";


export var createService = async (req, res) => {
  try {
    const { business_id,subcategory_name, service_name, description, price ,service_image } = req.body;

    if (!business_id || !subcategory_name || !service_name || !description || !price || !service_image) {
      return res.status(400).json({ status: "error", message: "All fields are required" });
    }
    console.log(req.body);
    
        const lastserviceid = await ServiceSchemaModel.findOne().sort({ service_id: -1 });
        console.log("last service id ",lastserviceid);
        
        const service_id = lastserviceid ? lastserviceid.service_id + 1 : 1;

    const newService = new Service({
      service_id,
      business_id,
      subcategory_name,
      service_name,
      description,
      price: parseFloat(price),
      service_image,
    });

    await newService.save();

    return res.status(201).json({
      status: "success",
      message: "Service created successfully",
      service: newService,
      status_code: 201,
    });
  } catch (error) {
    console.error("Error creating service:", error);
    return res.status(500).json({ status: "error", message: "Internal Server Error" });
  }
};

export var viewAllServices = async(req,res,next)=>{
  try{
    var resp = await ServiceSchemaModel.find()
    console.log("all services is :",resp);
    
    res.status(200).json({"status":true,"message":"data fetch successfully","data":resp})
  }catch(err){
    res.status(500).json({"status":false,"message":"data not found","error":err})
  }

}