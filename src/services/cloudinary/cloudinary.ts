import { env } from "@/env/index.js";
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    api_key: env.CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
    cloud_name: env.CLOUDINARY_CLOUD_NAME
})


export default cloudinary;