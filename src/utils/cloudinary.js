import { v2 as cloudinary } from "cloudinary";
import fs from "fs"

    // Configuration
    cloudinary.config({ 
        cloud_name: "CLOUDINARY_CLOUD_NAME", 
        api_key: "CLOUDINARY_API_KEY", 
        api_secret: "CLOUDINARY_API_SECRET" // Click 'View Credentials' below to copy your API secret
    });


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null
        //upload the file on cloudinary
        const response= await cloudinary.uploader.upload(localFilePath ,{
            resource_type : "auto"
        })
        //file has been uploader successfull
        console.log("file has uploaded successfully" , response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath) //remove the locally saved temporry file as upload operation got failed
        return null;
    }
}

export default uploadOnCloudinary
