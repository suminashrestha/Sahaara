import express from "express";
import upload from "../middlewares/upload.middleware";
import { authorize } from "../middlewares/auth.middleware";

import {
  createProfile,
  getProfile,
  getUserAdoptionPosts,
  getUserRescuePosts,
} from "../controllers";

const router = express.Router();

router
  .route("/")
  .post(
    authorize(["individual", "organization"]),
    upload.single("profilePicture"),
    createProfile
  );

router
  .route("/:userId")
  .get(authorize(["individual", "organization"]), getProfile);

router
  .route("/:userId/user-adoption-posts")
  .get(authorize(["individual", "organization"]), getUserAdoptionPosts);

router
  .route("/:userId/user-rescue-posts")
  .get(authorize(["individual", "organization"]), getUserRescuePosts);

export { router as profileRoute };
