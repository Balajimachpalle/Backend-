import mongoose from "mongoose";
import { DB_NAME } from "./constant.js";
import connectDB from "./db/index.js";
import dotenv from "dotenv";
dotenv.config({
    path: './env'
})

connectDB()



/*
import express from "express";
const app=express();

(async()=>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error",(error)=>{
            console.log("ERRR: ",error);
            throw error
        })

        app.listen(process.env.PORT,()=>{
            console.log(`app is listeing on port ${process.env.PORT}`);
        })
    }
    catch(error){
        console.log("ERRR ",error)
        throw error
    }
})()*/