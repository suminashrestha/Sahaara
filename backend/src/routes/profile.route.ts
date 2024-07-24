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

router.post(
  "/",
  authorize(["individual", "organization"]),
  upload.single("profilePicture"),
  createProfile
);

router.get("/:userId", authorize(["individual", "organization"]), getProfile);

router.get(
  "/:userId/user-adoption-posts",
  authorize(["individual", "organization"]),
  getUserAdoptionPosts
);

router.get(
  "/:userId/user-rescue-posts",
  authorize(["individual", "organization"]),
  getUserRescuePosts
);

router.put(
  "/toggle-volunteer-mode",
  authenticateWithJwt,
  authorize(["individual", "organization"]),
  toggleVolunteerMode
);

export { router as profileRoute };
