import asynch from "../utils/asynch.js";

const registerUser =asynch(async(req,res)=>{
    res.status(200).json({
        message:"BilderOP"
    })
})

export default registerUser