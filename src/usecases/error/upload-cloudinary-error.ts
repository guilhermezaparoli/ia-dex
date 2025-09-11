export class UploadCloudinaryError extends Error{
    constructor() {
        super("Failed to upload image to Cloudinary.")
    }
}