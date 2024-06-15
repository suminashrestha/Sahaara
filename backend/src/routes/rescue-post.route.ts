import express from "express";
import upload from "../middlewares/upload.middleware";
import { authenticateWithJwt, authorize } from "../middlewares/auth.middleware";
import {
  createRescuePost,
  deleteRescuePost,
  updateRescuePost,
  getAllRescuePosts,
  getSingleRescuePost,
} from "../controllers/rescue-post.controllers";

const router = express.Router();

router
  .route("/")
  .get(getAllRescuePosts)
  .post(
    authenticateWithJwt,
    authorize(["individual", "organization"]),
    upload.single("adoptionPostImage"),
    createRescuePost
  );

router
  .route("/:postId")
  .delete(authenticateWithJwt, deleteRescuePost)
  .put(
    authenticateWithJwt,
    upload.single("adoptionPostImage"),
    updateRescuePost
  )
  .get(authenticateWithJwt, getSingleRescuePost);

export { router as rescuePostRoute };
