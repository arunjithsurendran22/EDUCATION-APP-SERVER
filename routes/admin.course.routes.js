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
} from "../controllers/controllers.js";
import { adminAuthorization } from "../middleware/adminAuthMiddleware.js";
import { uploading } from "../multer/multer.js";
const router = express.Router();

//admin Add course endpoints
router.post("/add-course/create", adminAuthorization, uploading, addCourse);
router.get("/add-course/get", adminAuthorization, getCourses);
router.put("/add-course/edit/:courseId", adminAuthorization, uploading, updateCourse);
router.delete("/add-course/delete/:courseId", adminAuthorization, uploading, deleteCourse);

//admin Add subjects
router.post("/add-subjects/create/:courseId", adminAuthorization, uploading, addSubjectToCourse);
router.get("/add-subjects/get/:courseId", adminAuthorization,  getSubjectsForCourse);
router.put("/add-subjects/edit/:courseId/:subjectId", adminAuthorization, uploading, updateSubjectForCourse);
router.delete("/add-subjects/delete/:courseId/:subjectId", adminAuthorization, uploading, deleteSubjectFromCourse);

export default router;
