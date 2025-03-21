import mongoose from "mongoose";
const url = process.env.URL ||  "mongodb+srv://sakshammalviya12345:@saksham8120@cluster0.l3njz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
// 
mongoose.connect(url)
console.log("Connect to Database to server");
