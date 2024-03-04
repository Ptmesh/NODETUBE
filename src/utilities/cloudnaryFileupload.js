import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDNAME, 
  api_key:process.env.CLOUDAPI ,
  api_secret:process.env.CLOUDAPISEC 
});

const uploadOnCloud= async (localFilePath)=>{
    try {
        if (!localFilePath) {
            return null
        }
        // Else Upload
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // After uploading 
        console.log("Uploaded file on cloud!", response.url);
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)  //Removes the local saved temp file as the uploading was unsucessfull
        return null;
    }
}

export { uploadOnCloud };
