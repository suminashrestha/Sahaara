import { Request, Response } from "express";
import { IComment, ILike, RescuePost } from "../models/rescue-post.model";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "./adoption-post.controllers";
import { User } from "../models/user.model";
import mongoose from "mongoose";

const getAllRescuePosts = asyncHandler(async (req: Request, res: Response) => {
  const rescuePosts = await RescuePost.find({}).populate({
    path: "rescuePostAuthor",
    select: "username type profile",
    populate: { path: "profile", select: "profilePicture" },
  });

  if (!rescuePosts.length) {
    return res.status(404).json({
      success: false,
      message: "No Posts found",
      error: "Something went wrong while fetching data",
    });
  }

  res.status(200).json({
    success: true,
    message: "All posts received",
    data: rescuePosts,
  });
});

const createRescuePost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { title, description, lat, lng } = req.body;

    let rescuePostImage = "";
    if (req.file?.filename) {
      rescuePostImage = ` ${req.protocol}://${req.get("host")}/images/${
        req.file?.filename
      }`;
    }

    const rescuePost = new RescuePost({
      rescuePostAuthor: req.user._id,
      title,
      description,
      location: {
        lng: Number(lng),
        lat: Number(lat),
      },
      rescuePostImage,
      likes: [],
      comments: [],
    });

    const savedPost = await rescuePost.save();
    res.status(201).json({
      success: true,
      message: "New post added",
      data: savedPost,
    });
  }
);

const deleteRescuePost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { postId } = req.params;

    const post = await RescuePost.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `No post with this id exists`,
      });
    }

    if (!req.user._id.equals(post.rescuePostAuthor)) {
      return res.status(403).json({
        success: false,
        message: "You are not eligible to delete this post",
      });
    }

    const deletedPost = await RescuePost.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(500).json({
        success: false,
        message: "Failed to delete post",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: deletedPost,
    });
  }
);

const updateRescuePost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { postId } = req.params;
    const updates = req.body;

    const post = await RescuePost.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No post with this id exists",
      });
    }

    if (!req.user._id.equals(post.rescuePostAuthor)) {
      return res.status(403).json({
        success: false,
        message: "You are not eligible to update this post",
      });
    }

    if (req.file) {
      updates.rescuePostImage = ` ${req.protocol}://${req.get("host")}/images/${
        req.file?.filename
      }`;
    }

    const updatedPost = await RescuePost.findByIdAndUpdate(postId, updates, {
      new: true,
    });
    if (!updatedPost) {
      return res.status(404).json({ message: "Failed to update the post" });
    }
    res.status(200).json({
      success: true,
      message: "Post Updated Successfully",
      data: updatedPost,
    });
  }
);

const getSingleRescuePost = asyncHandler(
  async (req: Request, res: Response) => {
    const { postId } = req.params;

    const post = await RescuePost.findById(postId).populate({
      path: "rescuePostAuthor",
      select: "username type profile",
      populate: { path: "profile", select: "profilePicture" },
    });

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post couldnot be fetched",
        message: "Post not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Post fetched",
      data: post,
    });
  }
);

const addComment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { postId } = req.params;

  const post = await RescuePost.findById(postId);
  if (!post) {
    return res
      .status(404)
      .json({ message: `No post with id ${postId} found`, success: false });
  }

  let user = await User.findById(req.user._id);

  const newComment = {
    _id: new mongoose.Types.ObjectId(),
    name: user?.username,
    commenter: req.user._id,
    comment: String(req.body.comment),
  };

  post.comments.push(newComment as IComment);
  await post.save();

  return res.status(200).json({
    success: true,
    message: "Comment added successfully",
    data: newComment,
  });
});

const deleteComment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { postId, commentId } = req.params;

  const post = await RescuePost.findById(postId);

  if (!post) {
    return res
      .status(404)
      .json({ message: `No post with id ${postId} found!!!`, success: false });
  }

  if (post.comments.length === 0) {
    return res.status(404).json({
      message: `No comment found the specified post`,
      success: false,
    });
  }

  const commentIndex = post.comments.findIndex(
    (comment: IComment) => comment._id?.toString() === commentId
  );

  if (!req.user._id.equals(post.comments[commentIndex].commenter)) {
    return res
      .status(401)
      .json({ message: "Invalid Credentials", success: false });
  }

  const deletedComment = post.comments[commentIndex];

  post.comments.splice(commentIndex, 1);

  const updatedPost = await post.save();

  res.status(200).json({
    success: true,
    message: "Message Deleted Successfully",
    data: { deletedComment, updatedPost },
  });
});

const updateComment = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { postId, commentId } = req.params;

  const post = await RescuePost.findById(postId);

  if (!post) {
    return res
      .status(404)
      .json({ message: `No post with id ${postId} found!!!`, success: false });
  }

  if (post.comments.length === 0) {
    return res.status(404).json({
      message: `No comment found the specified post`,
      success: false,
    });
  }

  const commentIndex = post.comments.findIndex(
    (comment: IComment) => comment._id?.toString() === commentId
  );

  if (!req.user._id.equals(post.comments[commentIndex].commenter)) {
    return res
      .status(401)
      .json({ message: "Invalid Credentials", success: false });
  }

  post.comments[commentIndex].comment =
    req.body.comment || post.comments[commentIndex].comment;

  const updatedPost = await post.save();

  res.status(200).json({
    success: true,
    message: "Comment Updated Successfully",
    data: updatedPost,
  });
});

const addLike = asyncHandler(async (req: AuthRequest, res: Response) => {
  try {
    const rescuePost = await RescuePost.findById(req.params.postId);

    if (!rescuePost) {
      return res.status(404).json({
        success: false,
        message: "No post with this ID found",
      });
    }

    if (!req.user || !req.user._id) {
      return res
        .status(400)
        .json({ message: "User information is missing", success: false });
    }

    const userIdStr = req.user._id.toString();

    if (
      rescuePost.likes.filter((like: ILike) => {
        if (!like.user) {
          return false;
        }

        return like.user.toString() === userIdStr;
      }).length > 0
    ) {
      return res.status(400).json({
        success: false,
        message: "The post has already been upvoted",
      });
    }

    rescuePost.likes.push({
      user: new mongoose.Types.ObjectId(req.user._id),
    });
    await rescuePost.save();

    res.status(200).json({
      success: true,
      message: "Upvoted this post",
      data: {
        likes: rescuePost.likes,
        likesCount: rescuePost.likes.length,
      },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

const removeLike = asyncHandler(async (req: AuthRequest, res: Response) => {
  const rescuePost = await RescuePost.findById(req.params.postId);

  if (!rescuePost) {
    return res.status(404).json({
      success: false,
      message: "No post with this found",
    });
  }

  if (
    rescuePost.likes.filter(
      (like: ILike) => like.user.toString() === req.user._id.toString()
    ).length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "The post hasn't been upvoted yet",
    });
  }

  const likeIndex = rescuePost.likes.findIndex(
    (like) => like.toString() === req.user._id.toString()
  );

  rescuePost.likes.splice(likeIndex, 1);

  await rescuePost.save();

  res.status(200).json({
    success: true,
    message: "Removed the upvote",
    data: {
      likes: rescuePost.likes,
      likesCount: rescuePost.likes.length,
    },
  });
});

export {
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
};
