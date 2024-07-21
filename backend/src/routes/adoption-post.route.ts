import express from "express";
import upload from "../middlewares/upload.middleware";
import { authenticateWithJwt, authorize } from "../middlewares/auth.middleware";
import {
  createAdoptionPost,
  deleteAdoptionPost,
  getAllAdoptionPosts,
  getSingleAdoptionPost,
  updateAdoptionPost,
} from "../controllers";

const router = express.Router();

router
  .route("/")
  .get(authenticateWithJwt, getAllAdoptionPosts)
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
