import express from "express";

import {
  getAllAdoptionPosts,
  createAdoptionPost,
  deleteAdoptionPost,
  updateAdoptionPost,
  getSingleAdoptionPost,
} from "../controllers/adoption-post.controllers";
import upload from "../middlewares/upload.middleware";
import { authenticateWithJwt, authorize } from "../middlewares/auth.middleware";
import {
  createRescuePost,
  deleteRescuePost,
  updateRescuePost,
  getAllRescuePosts,
  getSingleRescuePost,
} from "../controllers/rescue-post.controllers";

const router = express.Router();

router.get("/", getAllRescuePosts);
router.post(
  "/",
  authenticateWithJwt,
  authorize(["individual", "organization"]),
  upload.single("adoptionPostImage"),
  createRescuePost
);
router.delete("/:postId", authenticateWithJwt, deleteRescuePost);
router.put(
  "/:postId",
  authenticateWithJwt,
  upload.single("adoptionPostImage"),
  updateRescuePost
);
router.get("/:postId", authenticateWithJwt, getSingleRescuePost);

export { router as rescuePostRoute };
