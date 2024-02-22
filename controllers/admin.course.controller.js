import { adminModel } from "../models/models.js";
import cloudinary from "../cloudinary/cloudinary.js";
//POST:Admin add course
const addCourse = async (req, res, next) => {
  try {
    const adminId = req.adminId;
    const role = req.role;
    const { title, description } = req.body;

    if (!adminId && !role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingAdmin = await adminModel.findById(adminId);

    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    // Upload image to Cloudinary
    const { secure_url } = await cloudinary.v2.uploader.upload(req.file.path);
    // Create a new food category
    const newCourse = {
      title,
      description,
      image: secure_url,
    };

    existingAdmin.course.push(newCourse);
    // Save the updated admin document
    await existingAdmin.save();
    res.status(201).json({
      message: "Food Course added successfully",
      course: newCourse,
    });
  } catch (error) {
    next(error);
    console.error("Error in addCourse:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET: Get all courses
const getCourses = async (req, res, next) => {
  try {
    // Assuming you want to fetch courses for a specific admin
    const adminId = req.adminId;
    const role = req.role;
    if (!adminId && !role) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Find the admin by ID
    const existingAdmin = await adminModel.findById(adminId);

    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Extract the courses from the admin document
    const courses = existingAdmin.course;

    res.status(200).json({ courses });
  } catch (error) {
    next(error);
    console.error("Error in getCourses:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// PUT: Update a course
const updateCourse = async (req, res, next) => {
  try {
    const adminId = req.adminId;
    const courseId = req.params.courseId;
    const { title, description } = req.body;

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingAdmin = await adminModel.findById(adminId);

    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Find the index of the course to be updated
    const courseIndex = existingAdmin.course.findIndex(
      (course) => course._id === courseId
    );

    if (courseIndex === -1) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Update the course properties
    if (title) {
      existingAdmin.course[courseIndex].title = title;
    }
    if (description) {
      existingAdmin.course[courseIndex].description = description;
    }

    // Save the updated admin document
    await existingAdmin.save();

    res.status(200).json({
      message: "Course updated successfully",
      course: existingAdmin.course[courseIndex],
    });
  } catch (error) {
    next(error);
    console.error("Error in updateCourse:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE: Delete a course
const deleteCourse = async (req, res, next) => {
  try {
    const adminId = req.adminId;
    const courseId = req.params.courseId;

    if (!adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingAdmin = await adminModel.findById(adminId);

    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Find the index of the course to be deleted
    const courseIndex = existingAdmin.course.findIndex(
      (course) => course._id === courseId
    );

    if (courseIndex === -1) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Remove the course from the array
    existingAdmin.course.splice(courseIndex, 1);

    // Save the updated admin document
    await existingAdmin.save();

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    next(error);
    console.error("Error in deleteCourse:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//POST :ADD sujects
const addSubjectToCourse = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const { title } = req.body;

    // Check if courseId is provided
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // Find the admin by ID (assuming authentication is already done)
    const adminId = req.adminId;
    const existingAdmin = await adminModel.findById(adminId);

    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Find the course by ID
    const course = existingAdmin.course.find(
      (course) => course._id.toString() === courseId
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Upload image to Cloudinary
    const { secure_url } = await cloudinary.v2.uploader.upload(req.file.path);

    // Add the subject to the course
    if (!course.subjects) {
      course.subjects = []; // Initialize subjects array if it's undefined
    }

    const newSubject = {
      title,
      courseName: course.title,
      courseId: courseId,
      image: secure_url,
    };

    // Add the subject to the course
    course.subjects.push(newSubject);

    // Save the updated admin document
    await existingAdmin.save();

    res.status(201).json({
      message: "Subject added to the course successfully",
      subject: {
        title,
        courseName: course.title,
        courseId: courseId,
        image: secure_url,
      }, // Use course title here
    });
  } catch (error) {
    next(error);
    console.error("Error in addSubjectToCourse:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// GET: Get subjects for a specific course
const getSubjectsForCourse = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;

    // Check if courseId is provided
    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // Find the admin by ID (assuming authentication is already done)
    const adminId = req.adminId;
    const existingAdmin = await adminModel.findById(adminId);

    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Find the course by ID
    const course = existingAdmin.course.id(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Retrieve subjects for the course
    const subjects = course.subjects;

    res.status(200).json({ subjects });
  } catch (error) {
    next(error);
    console.error("Error in getSubjectsForCourse:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// PUT: Update a subject for a specific course
const updateSubjectForCourse = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const subjectId = req.params.subjectId;
    const { title } = req.body;

    // Check if courseId and subjectId are provided
    if (!courseId || !subjectId) {
      return res
        .status(400)
        .json({ message: "Course ID and Subject ID are required" });
    }

    // Find the admin by ID (assuming authentication is already done)
    const adminId = req.adminId;
    const existingAdmin = await adminModel.findById(adminId);

    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Find the course by ID
    const course = existingAdmin.course.id(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find the subject by ID
    const subject = course.subjects.id(subjectId);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Update subject properties
    if (title) {
      subject.title = title;
    }

    // Check if a new image is provided
    if (req.file) {
      // Upload new image to Cloudinary
      const { secure_url } = await cloudinary.v2.uploader.upload(req.file.path);
      subject.image = secure_url;
    }

    // Save the updated admin document
    await existingAdmin.save();

    res.status(200).json({
      message: "Subject updated successfully",
      subject,
    });
  } catch (error) {
    next(error);
    console.error("Error in updateSubjectForCourse:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// DELETE: Delete a subject from a specific course
const deleteSubjectFromCourse = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const subjectId = req.params.subjectId;

    // Check if courseId and subjectId are provided
    if (!courseId || !subjectId) {
      return res
        .status(400)
        .json({ message: "Course ID and Subject ID are required" });
    }

    // Find the admin by ID (assuming authentication is already done)
    const adminId = req.adminId;
    const existingAdmin = await adminModel.findById(adminId);

    if (!existingAdmin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    // Find the course by ID
    const course = existingAdmin.course.id(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Find the subject by ID
    const subject = course.subjects.id(subjectId);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Remove the subject from the course
    subject.remove();

    // Save the updated admin document
    await existingAdmin.save();

    res.status(200).json({
      message: "Subject deleted successfully",
    });
  } catch (error) {
    next(error);
    console.error("Error in deleteSubjectFromCourse:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  addCourse,
  getCourses,
  updateCourse,
  deleteCourse,
  addSubjectToCourse,
  getSubjectsForCourse,
  updateSubjectForCourse,
  deleteSubjectFromCourse,
};
