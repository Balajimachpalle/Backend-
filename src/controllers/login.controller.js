import asynch from "../utils/asynch.js";
import ApiError from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import ApiResponse from "../utils/ApiResponse.js"

const generateAccessTokenAndRefreshToken = async (userId)=>{
    try {
        const user= await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshtoken = user.generateRefreshToken()

        user.refreshtoken=refreshtoken
        await user.save({validateBeforeSave:false})

        return {accessToken,refreshtoken}

    } catch (error) {
        throw new ApiError(500 , "something went wrong while generating refresh and access token")
    }
}

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
    // we alredy find user that why we use "user" instead of "User".
    const ispasswordValid = await user.isPasswordCorrect(password)
    if (!ispasswordValid) {
        throw new ApiError(401,"password incorrect")
    }
    
    const{accessToken,refreshtoken} =  await generateAccessTokenAndRefreshToken(user._id)
    const loggInuser = await User.findById(user._id).select("-password -refreshtoken")

    //cokkies 
    const options= {
        httpOnly:true, // cookie can manage bye server only that why we use httpOnly
        secure:true
    }
    return res.status(200).cookie("accessToken" ,accessToken , options).cookie("refreshtoken" ,refreshtoken, options)
    .json(
        new ApiResponse(
            200,
            {
                loggInuser,
                user:accessToken,
                refreshtoken
            },
            "User Logged in Successfully"
        )
    )
    

})
const logout = asynch(async(req,res)=>{
     await User.findByIdAndUpdate(
        req.user._id,
        {
            $set:{
                refreshtoken:undefined
            }
        },
        {
            new:true
        }
    )
    // Clear cookie 
    const options ={
        httpOnly:true,
        secure:true
    }
    
    return res.status(200).clearCookie("accessToken", options).clearCookie("refreshtoken",options)
    .json(
        new ApiResponse(200,{},"User looged out")
    )
    

})

export  {loginUser,logout}