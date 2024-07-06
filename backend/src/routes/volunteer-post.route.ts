import express from "express";
import { authenticateWithJwt, authorize } from "../middlewares/auth.middleware";
import {
  createVolunteerPost,
  deleteVolunteerPost,
  updateVolunteerPost,
  getAllVolunteerPosts,
  getSingleVolunteerPost,
} from "../controllers";

const router = express.Router();

router
  .route("/")
  .get(authenticateWithJwt, authorize(["individual"]), getAllVolunteerPosts)
  .post(authenticateWithJwt, authorize(["organization"]), createVolunteerPost);

router
  .route("/:postId")
  .delete(authenticateWithJwt, deleteVolunteerPost)
  .put(authenticateWithJwt, updateVolunteerPost)
  .get(authenticateWithJwt, authorize(["individual"]), getSingleVolunteerPost);

export { router as volunteerPostRoute };
