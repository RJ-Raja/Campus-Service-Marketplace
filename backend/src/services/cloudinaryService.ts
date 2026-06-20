import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';

// configure cloudinary via env; expect CLOUDINARY_URL or CLOUDINARY_* vars
// Example: CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME

export const uploadBufferToCloudinary = (buffer: Buffer, folder = 'csmp') => {
  return new Promise<string>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ folder }, (error, result) => {
      if (error) return reject(error);
      if (!result || !result.secure_url) return reject(new Error('Upload failed'));
      resolve(result.secure_url);
    });

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

export default { uploadBufferToCloudinary };
