import express from "express";
import {
  getAllAdoptionPosts,
  createAdoptionPost,
  deleteAdoptionPost,
  updateAdoptionPost,
  getSingleAdoptionPost,
} from "../controllers/adoption-post.controllers";
import upload from "../middlewares/upload.middleware";
import { authenticateWithJwt, authorize } from "../middlewares/auth.middleware";

const router = express.Router();

router
  .route("/")
  .get(getAllAdoptionPosts)
  .post(
    authenticateWithJwt,
    authorize(["individual", "organization"]),
    upload.single("adoptionPostImage"),
    createAdoptionPost
  );

router
  .route("/:postId")
  .delete(authenticateWithJwt, deleteAdoptionPost)
  .put(
    authenticateWithJwt,
    upload.single("adoptionPostImage"),
    updateAdoptionPost
  )
  .get(authenticateWithJwt, getSingleAdoptionPost);

export { router as adoptionPostRoute };
