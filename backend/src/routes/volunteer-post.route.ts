import express from "express";
import { authorize } from "../middlewares/auth.middleware";
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
  .get(authorize(["individual"]), getAllVolunteerPosts)
  .post(authorize(["organization"]), createVolunteerPost);

router
  .route("/:postId")
  .delete(deleteVolunteerPost)
  .put(updateVolunteerPost)
  .get(authorize(["individual"]), getSingleVolunteerPost);

export { router as volunteerPostRoute };
