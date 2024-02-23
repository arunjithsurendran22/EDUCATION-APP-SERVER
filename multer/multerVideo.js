import multer from "multer";

// Multer configuration for uploading videos
const videoUploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 200000000 }, // 200MB limit for videos
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("Only videos are allowed"));
    }
  }
});

// Middleware for uploading a single video
const videoUploading = videoUploader.single("video");

export { videoUploading };
