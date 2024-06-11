import express from "express";
import {
  signUpHandler,
  signInHandler,
  codeVerifier,
  getVerificationCode,
  resetPassword,
} from "../controllers/user.controllers";

const router = express.Router();

router.route("/sign-up").post(signUpHandler);

router.route("/sign-in").post(signInHandler);

router.route("/verify-code").get(getVerificationCode).post(codeVerifier);

router.route("/reset-password").post(resetPassword);

export { router as userRoute };
