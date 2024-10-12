import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/users.middleware.js";
import { addNewUser, getAllUsers, getUserById } from "../controllers/users.controller.js";

const router = express.Router();

router.route("/create/user").post(authMiddleware, isAdmin, addNewUser)
router.route("/get/user").get(authMiddleware, isAdmin, getUserById);
router.route("/get/users").get(authMiddleware, isAdmin, getAllUsers);

export default router;