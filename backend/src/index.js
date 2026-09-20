import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import {router} from "./routes/userRoutes.js"
import { propertyRouter } from "./routes/propertyRouter.js";
import { bookingRouter } from "./routes/bookingRouter.js";
import { tripRouter } from "./routes/tripRouter.js";


import connectDB from "./utils/db.js";
import seedDefaultProperties from "./utils/seedDefaultProperties.js";

dotenv.config();

const app = express();

//express.json
app.use(express.json({limit:"100mb"}))

//urlencoded
app.use(express.urlencoded({limit:"100mb", extended:true}))

//cookieParser
app.use(cookieParser())

// remove any trailing slash so "https://site.netlify.app/" also works
const allowedOrigin = (process.env.ORIGIN_ACCESS_URL || "").replace(/\/+$/, "");

app.use(cors({
    origin: allowedOrigin,
    credentials: true
}))

const port = process.env.PORT || 8080;


//test route
app.get("/",(req,res)=>{
    res.send("Homelyhub server is running")
})

app.get("/health",(req,res)=>{
    res.status(200).json({status:"ok"})
})

app.use("/api/v1/rent/user",router)
app.use("/api/v1/rent/listing",propertyRouter)
app.use("/api/v1/rent/user/booking", bookingRouter)
app.use("/api/v1/rent/trip", tripRouter)


// unknown route
app.use((req,res)=>{
    res.status(404).json({status:"fail", message:`Route ${req.originalUrl} not found`})
})

// global error handler
app.use((err,req,res,next)=>{
    console.error(err);
    res.status(err.status || 500).json({status:"error", message:err.message || "Something went wrong"})
})

connectDB().then(seedDefaultProperties);

app.listen(port,()=>{
    console.log(`App is running on port no: ${port}`);
})