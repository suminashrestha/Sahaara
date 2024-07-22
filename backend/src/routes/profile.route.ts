import express from "express";
import upload from "../middlewares/upload.middleware";
import { authorize } from "../middlewares/auth.middleware";

import { createProfile, getProfile, getMyProfile } from "../controllers";

const router = express.Router();

router.post(
  "/",
  authorize(["individual", "organization"]),
  upload.single("profilePicture"),
  createProfile
);

router.get(
  "/:profileId",
  authorize(["individual", "organization"]),
  getProfile
);

router.get("/me", authorize(["individual", "organization"]), getMyProfile);

export { router as profileRoute };
