import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
  userBlock,
  userDelete,
} from "../controllers/controllers.js";
import { adminAuthorization } from "../middleware/adminAuthMiddleware.js"

const router = express.Router();

//admin Authentication endpoints
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/admin-profile", adminAuthorization, getAdminProfile);

//admin block and unblock the user
router.post("/user/block-unblock/:userId", adminAuthorization, userBlock);
router.post("/delete-user/:userId", adminAuthorization, userDelete);
//logout
router.post("/logout", adminAuthorization, logoutAdmin);


export default router;