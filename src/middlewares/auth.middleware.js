import ApiError from "../utils/ApiError"
import asynch from "../utils/asynch"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model"



export const verifyJWT=asynch(async(req,res,next)=>{
    try {
        const token = await req.cookies?.acceshToken || req.header("authorization")?.replace("Bearer" ,"")
    
        if (!token) {
            throw new ApiError(401,"Unautorized request")
        }
    
        const decodedTokn = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        const user = User.findById(decodedTokn?._id).select("-password -refreshtoken")
    
        if (!user) {
            throw  new ApiError(401,"Invalid Access Token")
        }
        
        req.user=user;
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "invalid access token ")
        
    }


})