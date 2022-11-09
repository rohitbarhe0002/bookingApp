import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"



const app = express();


mongoose.connect(process.env.MONGODB_URL,{
    
}).then(() => {
    console.log("db is connected");
}).catch((e)=>{
    console.log("no connection with db");
})
//midddleware
app.use(express.json());
app.use(cookieParser());
app.use(cors())


app.use("/api/auth",authRoute)
app.use("/api/users",usersRoute)
app.use("/api/hotels",hotelsRoute)
app.use("/api/rooms",roomsRoute)
app.use("/api/register",authRoute)


app.use((req,res,next,err)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message   || "something went wrong"
    // return res.status(errorStatus).json({
    //     success:false,
    //     status:errorStatus,
    //     message:errorMessage,
    //     stack:err.stack,
    // })
})
app.listen(process.env.PORT,()=>{
    console.log("succesfully connected to backend");
})