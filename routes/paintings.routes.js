import express from "express";
import { authMiddleware, isAdmin } from "../middlewares/users.middleware.js";
import { createNewPainting, deleteImage, getAllPaintings, updatePainting } from "../controllers/paintings.controller.js";

const router = express.Router();

router.route("/create/painting").post(authMiddleware, isAdmin, createNewPainting);
router.route("/get/paintings").get(authMiddleware, isAdmin, getAllPaintings);
router.route("/delete/painting").delete(authMiddleware, isAdmin, deleteImage);
router.route("/update/painting/:paintingId").put(authMiddleware, isAdmin, updatePainting);

export default router;