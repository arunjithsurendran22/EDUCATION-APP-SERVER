import multer from "multer";

// Multer configuration for uploading images
const imageUploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 5000000 }, // 5MB limit for images
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

// Middleware for uploading a single image
const imageUploading = imageUploader.single("image");

export { imageUploading };
