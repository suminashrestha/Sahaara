import express from "express";
import upload from "../middlewares/upload.middleware";
import { authorize } from "../middlewares/auth.middleware";
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
    authorize(["individual", "organization"]),
    upload.single("rescuePostImage"),
    createRescuePost
  );

router
  .route("/:postId")
  .delete(deleteRescuePost)
  .put(upload.single("rescuePostImage"), updateRescuePost)
  .get(getSingleRescuePost);

router.route("/:postId/comments").put(addComment);

router
  .route("/:postId/comments/:commentId")
  .put(updateComment)
  .delete(deleteComment);

router.route("/:postId/like").put(addLike);

router.route("/:postId/remove-like").put(removeLike);

export { router as rescuePostRoute };
