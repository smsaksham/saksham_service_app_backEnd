import express from "express"
import userRoute from "./routes/userRoute.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import session, { Cookie } from "express-session"
import cors from "cors"
import adminRoute from "./routes/adminRoute.js"
import businessRoute from "./routes/businessRoute.js"
import categoryRoute from "./routes/categoryRoute.js"
import subCategoryRoute from "./routes/subCategoryRoute.js"
import serviceRoute from "./routes/serviceRoute.js"
import BookingRoute from "./routes/bookingRoute.js"
import PaymentRoute from "./routes/paymentRoute.js"
// make app
const app  = express()

// Configure CORS to allow requests from http://localhost:5173
app.use(cors({

  }));

// session and cookie configration

app.use(cookieParser())
app.use(session({secret: '@smsaksham',}));

// body parser configration
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json());
// connect to routes 
app.use("/user",userRoute)
app.use("/admin",adminRoute)
app.use("/business",businessRoute)
app.use("/category",categoryRoute);
app.use("/subcategory",subCategoryRoute);
app.use("/service",serviceRoute);
app.use("/booking",BookingRoute);
app.use("/payment",PaymentRoute);

app.listen(process.env.PORT || 8989,()=>{
    console.log("http://localhost:8989/user");
    
})