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
    upload.single("rescuePostImage"),
    createRescuePost
  );

router
  .route("/:postId")
  .delete(authenticateWithJwt, deleteRescuePost)
  .put(authenticateWithJwt, upload.single("rescuePostImage"), updateRescuePost)
  .get(authenticateWithJwt, getSingleRescuePost);

router.route("/:postId/comments").put(authenticateWithJwt, addComment);

router
  .route("/:postId/comments/:commentId")
  .put(authenticateWithJwt, updateComment)
  .delete(authenticateWithJwt, deleteComment);

router.route("/:postId/like").put(authenticateWithJwt, addLike);

router.route("/:postId/remove-like").put(authenticateWithJwt, removeLike);

export { router as rescuePostRoute };
