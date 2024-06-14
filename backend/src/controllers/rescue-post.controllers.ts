import { Request, Response } from "express";
import { RescuePost } from "../models/rescue-post.model";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "./adoption-post.controllers";

const getAllRescuePosts = asyncHandler(async (req: Request, res: Response) => {
  const rescuePosts = await RescuePost.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "rescuePostAuthor",
        foreignField: "_id",
        as: "authorInfo",
      },
    },
    { $unwind: "$authorInfo" },
    {
      $project: {
        title: 1,
        description: 1,
        location: 1,
        rescuePostImage: 1,
        likes: 1,
        comments: 1,
        authorUserName: "$authorInfo.username",
      },
    },
  ]).exec();

  if (!rescuePosts) {
    return res.status(404).json({
      succses: false,
      message: "No Posts found",
      error: "Something went wrong while fetching datas",
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
    const { title, description, location } = req.body;
    let rescuePostImage = "";
    if (req.file?.path) {
      rescuePostImage = req.file.path;
    }

    const rescuePost = new RescuePost({
      rescuePostAuthor: req.user._id,
      title,
      description,
      location: location ?? "",
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
      updates.rescuePostImage = req.file.path;
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

const getSingleRescuePost = asyncHandler(async (req: Request, res: Response) => {
  const { postId } = req.params;

  const post = await RescuePost.findById(postId);
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
});

export {
  createRescuePost,
  deleteRescuePost,
  updateRescuePost,
  getAllRescuePosts,
  getSingleRescuePost,
};
