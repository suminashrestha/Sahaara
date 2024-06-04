import express from "express";
import {
  signUpHandler,
  signInHandler,
  codeVerifier,
} from "../controllers/user.controllers";

const router = express.Router();

router.route("/sign-up").post(signUpHandler);

router.route("/sign-in").post(signInHandler);

router.route("/verify-code").post(codeVerifier);

export { router as userRoute };
