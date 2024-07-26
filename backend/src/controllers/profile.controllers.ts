import e, { Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "./adoption-post.controllers";
import { Profile } from "../models/profile.model";
import { RescuePost } from "../models/rescue-post.model";
import { AdoptionPost } from "../models/adoption-post.model";

const createProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name, location } = req.body;

  const profileExists = await Profile.findOne({ user: req.user._id });
  if (profileExists) {
    return res.status(400).json({
      success: false,
      message: "You have already created profile",
    });
  }

  if (!req.user.isVerified) {
    return res.status(400).json({
      success: false,
      message: "User Not Verified",
    });
  }

  let profilePicture = "";
  if (req.file?.filename) {
    profilePicture = ` ${req.protocol}://${req.get("host")}/images/${
      req.file?.filename
    }`;
  }

  const newProfile = new Profile({
    user: req.user._id,
    name,
    location,
    profilePicture,
  });

  if (!newProfile) {
    return res.status(400).json({
      success: false,
      message: "Profile creation failed",
    });
  }

  await newProfile.save();

  res.status(200).json({
    success: true,
    message: "User Profile Created",
    data: newProfile,
  });
});

const getProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { userId } = req.params;

  const userProfile = await Profile.findOne({ user: userId })
    .populate({
      path: "user",
      select: "username email type isVolunteer",
    })
    .exec();

  if (!userProfile) {
    return res.status(404).json({
      success: false,
      message: "Profile not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User Profile Loaded",
    data: userProfile,
  });
});

const getUserRescuePosts = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.params.userId;
    const posts = await RescuePost.find({ rescuePostAuthor: userId });

    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ message: "User has 0 rescue posts", success: false });
    }

    const receivePosts = posts.map((post) => ({
      _id: post._id,
      title: post.title,
      description: post.description,
      rescuePostImage: post.rescuePostImage,
    }));

    res.status(200).json({
      message: "All Posts Fetched",
      data: receivePosts,
    });
  }
);

const getUserAdoptionPosts = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.params.userId;
    const posts = await AdoptionPost.find({ adoptionPostAuthor: userId });

    if (!posts || posts.length === 0) {
      return res
        .status(404)
        .json({ message: "User has 0 adoption posts", success: false });
    }

    const receivePosts = posts.map((post) => ({
      _id: post._id,
      name: post.name,
      age: post.age,
      category: post.category,
      adoptionImage: post.adoptionPostImage,
    }));

    res.status(200).json({
      message: "All Posts Fetched",
      data: receivePosts,
    });
  }
);

export { createProfile, getProfile, getUserAdoptionPosts, getUserRescuePosts };
