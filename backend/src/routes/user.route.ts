import express from "express";
import {
  signUpHandler,
  signInHandler,
  codeVerifier,
  getVerificationCode,
  resetPassword,
  logoutUser,
  refreshAccessToken,
} from "../controllers";

const router = express.Router();

router.route("/sign-up").post(signUpHandler);

router.route("/sign-in").post(signInHandler);

router.route("/verify-code").post(codeVerifier);

router.route("/get-verification-code").post(getVerificationCode);

router.route("/reset-password").post(resetPassword);

router.route("/logout").post(logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

export { router as userRoute };
