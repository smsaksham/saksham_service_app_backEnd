import mongoose from "mongoose";
const url = process.env.URL ||  "mongodb://127.0.0.1:27017/service_app"
mongoose.connect(url)
console.log("Connect to Database to server");
