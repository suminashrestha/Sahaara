import express from "express";
import upload from "../middlewares/upload.middleware";
import { authenticateWithJwt, authorize } from "../middlewares/auth.middleware";
import {
  createRescuePost,
  deleteRescuePost,
  updateRescuePost,
  getAllRescuePosts,
  getSingleRescuePost,
  addComment,
  deleteComment,
  updateComment,
  addLike,
  removeLike,
} from "../controllers";

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

router.route("/:postId/comments").put(authenticateWithJwt, addComment);

router
  .route("/:postId/comments/:commentId")
  .put(authenticateWithJwt, updateComment)
  .delete(authenticateWithJwt, deleteComment);

router.route("/:postId/like").put(addLike);

router.route("/:postId/remove-like").put(removeLike);

export { router as rescuePostRoute };
