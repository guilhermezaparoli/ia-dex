import { AppError } from "./app-error.js";

export class UploadCloudinaryError extends AppError {
    constructor() {
        super("Failed to upload image to Cloudinary.", 502);
    }
}