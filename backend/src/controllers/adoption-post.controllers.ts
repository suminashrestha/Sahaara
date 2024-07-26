import { Request, Response } from "express";
import { AdoptionPost } from "../models/adoption-post.model";
import asyncHandler from "../utils/asyncHandler";

export interface AuthRequest extends Request {
  user?: any;
}

const validCategories = ["cat", "dog", "bird"];
const validSortFields = ["createdAt", "name", "breed"];
const validSortOrders = ["asc", "desc"];

const getAllAdoptionPosts = asyncHandler(
  async (req: Request, res: Response) => {
    const { cg, sortBy = "createdAt", sortOrder = "desc" } = req.query;

    if (typeof sortBy !== "string" || !validSortFields.includes(sortBy)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort field",
      });
    }

    if (typeof sortOrder !== "string" || !validSortOrders.includes(sortOrder)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sort order",
      });
    }

    if (cg && !validCategories.includes(cg as string)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }

    const filter: any = {};
    filter.isAdopted = false;

    if (cg) {
      filter.category = cg;
    }

    const sort: { [key: string]: 1 | -1 } = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    const adoptionPosts = await AdoptionPost.find(filter)
      .populate("adoptionPostAuthor", "username")
      .sort(sort)
      .exec();

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
    const {
      name,
      breed,
      age,
      gender,
      size,
      color,
      coatLength,
      characterstics,
      health,
      contact,
      myStory,
      category,
    } = req.body;

    let adoptionPostImage = "";
    if (req.file?.filename) {
      adoptionPostImage = ` ${req.protocol}://${req.get("host")}/images/${
        req.file?.filename
      }`;
    }

    let validcharacterstics: string[] = [];
    if (typeof characterstics === "string") {
      validcharacterstics = characterstics
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    } else if (Array.isArray(characterstics)) {
      validcharacterstics = characterstics.filter(
        (item) => typeof item === "string" && item.trim().length > 0
      );
    }

    let validHealth: string[] = [];
    if (typeof health === "string") {
      validHealth = health
        .split(",")
        .map((item) => item.trim())
        .filter((item) => item.length > 0);
    } else if (Array.isArray(health)) {
      validHealth = health.filter(
        (item) => typeof item === "string" && item.trim().length > 0
      );
    }

    const parsedContact =
      typeof contact === "string" ? JSON.parse(contact) : contact;

    const adoptionPost = new AdoptionPost({
      adoptionPostAuthor: req.user?._id,
      name,
      breed,
      age,
      gender,
      size,
      color,
      coatLength,
      characterstics: validcharacterstics,
      health: validHealth,
      contact: parsedContact,
      myStory,
      category,
      adoptionPostImage,
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
      updates.adoptionPostImage = ` ${req.protocol}://${req.get(
        "host"
      )}/images/${req.file?.filename}`;
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

const getSingleAdoptionPost = asyncHandler(
  async (req: Request, res: Response) => {
    const { postId } = req.params;

    const post = await AdoptionPost.findById(postId);
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

export {
  createAdoptionPost,
  deleteAdoptionPost,
  updateAdoptionPost,
  getAllAdoptionPosts,
  getSingleAdoptionPost,
};
