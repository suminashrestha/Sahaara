import { Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "./adoption-post.controllers";
import { Profile } from "../models/profile.model";

const createProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name, location } = req.body;

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
    .populate("user", "username", "type", "isVolunteer")
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

const getMyProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const myProfile = await Profile.findOne({ user: req.user._id })
    .populate({
      path: "user",
      select: "username email type isVolunteer",
    })
    .exec();

  if (!myProfile) {
    return res.status(404).json({
      success: false,
      message: "Profile not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "User Profile Loaded",
    data: myProfile,
  });
});

export { createProfile, getProfile, getMyProfile };
