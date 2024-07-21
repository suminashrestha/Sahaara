import express from "express";
import upload from "../middlewares/upload.middleware";
import { authenticateWithJwt, authorize } from "../middlewares/auth.middleware";

import { createProfile, getProfile, getMyProfile } from "../controllers";

const router = express.Router();

router.post(
  "/",
  authenticateWithJwt,
  authorize(["individual", "organization"]),
  upload.single("profilePicture"),
  createProfile
);

router.get(
  "/:profileId",
  authenticateWithJwt,
  authorize(["individual", "organization"]),
  getProfile
);

router.get(
  "/me",
  authenticateWithJwt,
  authorize(["individual", "organization"]),
  getMyProfile
);

export { router as profileRoute };
