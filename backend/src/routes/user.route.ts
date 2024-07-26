import express from "express";
import {
  signUpHandler,
  signInHandler,
  codeVerifier,
  getVerificationCode,
  resetPassword,
  logoutUser,
  refreshAccessToken,
  toggleVolunteerMode,
} from "../controllers";
import { authenticateWithJwt, authorize } from "../middlewares/auth.middleware";

const router = express.Router();

router.route("/sign-up").post(signUpHandler);

router.route("/sign-in").post(signInHandler);

router.route("/verify-code").post(codeVerifier);

router.route("/get-verification-code").post(getVerificationCode);

router.route("/reset-password").post(resetPassword);

router.route("/logout").post(authenticateWithJwt, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.put(
  "/toggle-volunteer-mode",
  authenticateWithJwt,
  authorize(["individual"]),
  toggleVolunteerMode
);

export { router as userRoute };
