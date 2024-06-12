import express from "express";

import {
  getAllAdoptionPosts,
  createAdoptionPost,
  deleteAdoptionPost,
  updateAdoptionPost,
} from "../controllers/adoption-post.controllers";
import upload from "../middlewares/upload.middleware";
import { authenticateWithJwt, authorize } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", getAllAdoptionPosts);
router.post(
  "/",
  authenticateWithJwt,
  authorize(["individual", "organization"]),
  upload.single("adoptionPostImage"),
  createAdoptionPost
);
router.delete("/:postId", authenticateWithJwt, deleteAdoptionPost);
router.put(
  "/:postId",
  authenticateWithJwt,
  upload.single("adoptionPostImage"),
  updateAdoptionPost
);

export { router as adoptionPostRoute };
