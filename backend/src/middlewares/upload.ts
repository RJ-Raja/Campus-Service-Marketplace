import multer from 'multer';
// Use memory storage so files are available as buffers for Cloudinary streaming
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
  },
});

export default upload;
