import express from "express";
import adminProfileRoute from "./admin.profile.routes.js";
import adminCourseRoute from "./admin.course.routes.js";
const router = express.Router();

const defaultRoutes = [
  {
    path: "/admin/profile",
    route: adminProfileRoute,
  },
  {
    path: "/admin/course",
    route: adminCourseRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
