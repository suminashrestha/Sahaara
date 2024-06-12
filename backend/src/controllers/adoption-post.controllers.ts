import { Request, Response } from "express";
import { AdoptionPost } from "../models/adoption-post.model";
import asyncHandler from "../utils/asyncHandler";

export interface AuthRequest extends Request {
  user?: any;
}

const validCategories = ["cat", "dog", "bird"];

const getAllAdoptionPosts = asyncHandler(
  async (req: Request, res: Response) => {
    const { cg } = req.query;

    if (cg && !validCategories.includes(cg as string)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }

    const filter: any = {};
    if (cg) {
      filter.category = cg;
    }

    const adoptionPosts = await AdoptionPost.aggregate([
      { $match: filter },
      {
        $lookup: {
          from: "users",
          localField: "adoptionPostAuthor",
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
          category: 1,
          adoptionPostImage: 1,
          adoptersList: 1,
          createdAt: 1,
          updatedAt: 1,
          authorUserName: "$authorInfo.username",
        },
      },
    ]).exec();

    const message = cg ? "Filtered Posts received" : "All Posts received";

    res.status(200).json({
      success: true,
      message,
      data: adoptionPosts,
    });
  }
);

const createAdoptionPost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { title, description, location, category } = req.body;
    let adoptionPostImage = "";
    if (req.file?.path) {
      adoptionPostImage = req.file.path;
    }

    const adoptionPost = new AdoptionPost({
      adoptionPostAuthor: req.user._id,
      title,
      description,
      location: location ?? "",
      category: category ?? "",
      adoptionPostImage,
      adoptersList: [],
    });

    const savedPost = await adoptionPost.save();
    res.status(201).json({
      success: true,
      message: "New post added",
      data: savedPost,
    });
  }
);

const deleteAdoptionPost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { postId } = req.params;

    const post = await AdoptionPost.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `No post with this id exists`,
      });
    }

    if (!req.user._id.equals(post.adoptionPostAuthor)) {
      return res.status(403).json({
        success: false,
        message: "You are not eligible to delete this post",
      });
    }

    const deletedPost = await AdoptionPost.findByIdAndDelete(postId);

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

const updateAdoptionPost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { postId } = req.params;
    const updates = req.body;

    const post = await AdoptionPost.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No post with this id exists",
      });
    }

    if (!req.user._id.equals(post.adoptionPostAuthor)) {
      return res.status(403).json({
        success: false,
        message: "You are not eligible to update this post",
      });
    }

    if (req.file) {
      updates.adoptionPostImage = req.file.path;
    }
    const updatedPost = await AdoptionPost.findByIdAndUpdate(postId, updates, {
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

export {
  createAdoptionPost,
  deleteAdoptionPost,
  updateAdoptionPost,
  getAllAdoptionPosts,
};
