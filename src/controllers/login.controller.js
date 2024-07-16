import asynch from "../utils/asynch.js";
import ApiError from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import ApiResponse from "../utils/ApiResponse.js"

const loginUser = asynch (async(req,res)=>{
    //req body ->data
    // username or email
    //find user
    //password check
    //access and refresh token 
    //send cookie

    const {email,username,password}=req.body
    if(!email || !username){
        throw new ApiError(400,"username or email is requirred")
    }
    
    const user = await User.findOne({
        $or:[{username},{email}] // $or is MongoDB query
    })
     
    if(!user){
        throw new ApiError(404,"user does not exist")
    }

})