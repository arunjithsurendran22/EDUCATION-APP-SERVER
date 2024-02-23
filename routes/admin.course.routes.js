import express from "express";
import {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  addSubjectToCourse,
  getSubjectsForCourse,
  updateSubjectForCourse,
  deleteSubjectFromCourse,
  uploadVideoForSubject,
} from "../controllers/controllers.js";
import { adminAuthorization } from "../middleware/adminAuthMiddleware.js";
import { imageUploading   } from "../multer/multer.js";
import { videoUploading } from "../multer/multerVideo.js"
const router = express.Router();

//admin Add course endpoints
router.post("/add-course/create", adminAuthorization, imageUploading, addCourse);
router.get("/add-course/get", adminAuthorization, getCourses);
router.put("/add-course/edit/:courseId", adminAuthorization, imageUploading, updateCourse);
router.delete("/add-course/delete/:courseId", adminAuthorization, deleteCourse);

//admin Add subjects
router.post("/add-subjects/create/:courseId", adminAuthorization, imageUploading, addSubjectToCourse);
router.get("/add-subjects/get/:courseId", adminAuthorization,  getSubjectsForCourse);
router.put("/add-subjects/edit/:courseId/:subjectId", adminAuthorization, imageUploading, updateSubjectForCourse);
router.delete("/add-subjects/delete/:courseId/:subjectId", adminAuthorization, deleteSubjectFromCourse);

//admin add videos in a specific subject
router.post("/add-subjects/upload-video/:courseId/:subjectId", adminAuthorization, videoUploading ,uploadVideoForSubject);

export default router;
