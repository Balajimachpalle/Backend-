import asynch from "../utils/asynch.js";
import ApiError from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import uploadOnCloudinary from "../utils/cloudinary.js"
import ApiResponse from "../utils/ApiResponse.js"

const registerUser =asynch(async(req,res)=>{
    // res.status(200).json({
    //     message:"BilderOP"
    // })
 
    // ---------------HOW TO MAKE LOGIC FOR USERegister--------------

    //step1-- get usere details from frontend--
    // validation - non empty
    // check if user is already eexit: usernane,email
    // check for image , check for avtar
    // uploade avtar and image on cloudinary 
    // create user object - entry in db
    // remove password and refreash token from response
    // check for user creation 
    // return response

    const {username,email,fullname,password}=req.body
    console.log("emial: ",email)
    // stpe2
    if(username ===""){
        throw new ApiError(400,"all fields are require")
    }
    if(email ===""){
        throw new ApiError(400,"all fields are require")
    }
    if(fullname ===""){
        throw new ApiError(400,"all fields are require")
    }
    if(password ===""){
        throw new ApiError(400,"all fields are require")
    }
     
    //step3
    const exitUser=User.findOne({
        $or:[{email},{username}]
    })
    if(exitUser){
        throw new ApiError(409, "already emial  or username is present")
    }
    
    //step 4
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;
    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is required")
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage= await uploadOnCloudinary(coverImageLocalPath)
    if (!avatar) {
        throw new ApiError(400, "avatar file is required")
    }
    if (!coverImage) {
        throw new ApiError(400, "coverImage file is required")
    }

    //step 5
    const user = await User.create({
        fullname,
        avatar:avatar.url,
        coverImage:coverImage?.url || "",
        email,
        username:username.toLowerCase(),
        password
    })

    //ste 6
    const createdUser  = await User.findById(user._id).select("-password -refreshtoken")
    if(!createdUser){
        throw new ApiError(500,"sometthing went wrong while user registering")
    }
    
    //step 7 last
    return res.status(201).json(
        new ApiResponse(200, createdUser , "user register successfull")
    )

})

export default registerUser