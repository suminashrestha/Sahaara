import express from "express";
import { signUpHandler, signInHandler } from "../controllers/user.controllers";

const router = express.Router();

router.route("/sign-up").post(signUpHandler);

router.route("/sign-in").post(signInHandler);

export { router as userRoute };
