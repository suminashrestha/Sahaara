import express from "express";
import { eSewaController, stripeController } from "../controllers";

const router = express.Router();

router.route("/stipe").post(stripeController);

router.route("/eSewa").post(eSewaController);

export { router as donationRoute };
