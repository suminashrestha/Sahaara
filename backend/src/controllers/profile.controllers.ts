import { Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "./adoption-post.controllers";
import { Individual } from "../models/individual.model";
import { Organization } from "../models/organization.model";
import { UserType } from "../models/user.model";

const createProfile = asyncHandler(async (req: AuthRequest, res: Response) => {
  const { name, location, isVolunteer } = req.body;

  if (!req.user.isVerified) {
    return res.status(400).json({
      success: false,
      message: "User Not Verified",
    });
  }

  let profilePicture = "";
  if (req.file?.path) {
    profilePicture = req.file.path;
  }

  let newProfile;

  if (req.user.type === UserType.Individual) {
    newProfile = new Individual({
      user: req.user._id,
      name,
      location,
      isVolunteer,
      profilePicture,
    });
  } else if (req.user.type === UserType.Organization) {
    newProfile = new Organization({
      user: req.user._id,
      name,
      location,
      profilePicture,
    });
  }

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
  const { profileId } = req.params;

  let userProfile;

  if (req.user.type === UserType.Individual) {
    userProfile = await Individual.findById(profileId);
  } else if (req.user.type === UserType.Organization) {
    userProfile = await Organization.findById(profileId);
  }

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
  let myProfile;

  if (req.user.type === UserType.Individual) {
    myProfile = await Individual.findOne({ user: req.user._id });
  } else if (req.user.type === UserType.Organization) {
    myProfile = await Organization.findOne({ user: req.user._id });
  }

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

const toggleVolunteerMode = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { isVolunteer } = req.body;

    if (typeof isVolunteer !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Invalid input for volunteer mode",
      });
    }

    let user;

    if (req.user.type === UserType.Individual) {
      user = await Individual.findOne({ user: req.user._id });
    } else if (req.user.type === UserType.Organization) {
      return res.status(400).json({
        success: false,
        message: "Operation not supported for Organization",
      });
    }

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Couldn't update the Volunteer mode",
      });
    }

    user.isVolunteer = isVolunteer;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  }
);

export { createProfile, getProfile, getMyProfile, toggleVolunteerMode };
