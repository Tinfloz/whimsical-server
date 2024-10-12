import express from "express";
import loginUsers from "../controllers/auth.controllers.js";

const router = express.Router();

router.route("/login").post(loginUsers);

export default router;