import express from "express";
import adminProfileRoute from "./admin.profile.routes.js";

const router = express.Router();

const defaultRoutes = [
  {
    path: "/admin/profile",
    route: adminProfileRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
