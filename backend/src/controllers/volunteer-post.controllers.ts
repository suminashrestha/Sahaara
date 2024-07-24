import { Response } from "express";
import { VolunteerPost } from "../models/volunteer-post.model";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "./adoption-post.controllers";
<<<<<<< HEAD
import { Individual } from "../models/individual.model";
=======
import { User, UserType } from "../models/user.model";
>>>>>>> aa0397204373d4015d12be71021a90aa25f02fcd

const getAllVolunteerPosts = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const user = await Individual.findOne({
      user: req.user._id,
    });

    if (user && !user.isVolunteer) {
      return res.status(400).json({
        success: false,
        message: "Since Volunteer mode is off,ACCESS DENIED",
      });
    }

    const volunteerPosts = await VolunteerPost.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "organizationInfo",
        },
      },
      { $unwind: "$organizationInfo" },
      {
        $project: {
          title: 1,
          description: 1,
          authorUserName: "$organizationInfo.username",
        },
      },
    ]).exec();

    if (!volunteerPosts) {
      return res.status(404).json({
        succses: false,
        message: "No Posts found",
        error: "Something went wrong while fetching datas",
      });
    }

    res.status(200).json({
      success: true,
      message: "All posts received",
      data: volunteerPosts,
    });
  }
);

const createVolunteerPost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
<<<<<<< HEAD
    const { title, description } = req.body;
=======
    const { title, location, date, eventTime } = req.body;

    const [hoursStr, minutesStr] = eventTime.split(":");
    const hours = String(parseInt(hoursStr, 10)).padStart(2, "0");
    const minutes = String(parseInt(minutesStr, 10)).padStart(2, "0");

    const formattedTime = `${hours}:${minutes}`;
    let formattedDate = "";
    if (date) {
      const _date = new Date(date);
      formattedDate = `${_date.getFullYear()}-${String(
        _date.getMonth() + 1
      ).padStart(2, "0")}-${String(_date.getDate()).padStart(2, "0")}`;
    }
>>>>>>> aa0397204373d4015d12be71021a90aa25f02fcd

    const volunteerPost = new VolunteerPost({
      userId: req.user._id,
      title,
<<<<<<< HEAD
      description,
=======
      location,
      date: formattedDate,
      eventTime: formattedTime,
>>>>>>> aa0397204373d4015d12be71021a90aa25f02fcd
    });

    const savedPost = await volunteerPost.save();
    res.status(201).json({
      success: true,
      message: "New post added",
      data: savedPost,
    });
  }
);

const deleteVolunteerPost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { postId } = req.params;

    const post = await VolunteerPost.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: `No post with this id exists`,
      });
    }

    if (!req.user._id.equals(post.userId)) {
      return res.status(403).json({
        success: false,
        message: "You are not eligible to delete this post",
      });
    }

    const deletedPost = await VolunteerPost.findByIdAndDelete(postId);

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

const updateVolunteerPost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { postId } = req.params;
    const updates = req.body;

    const post = await VolunteerPost.findById(postId);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "No post with this id exists",
      });
    }

    if (!req.user._id.equals(post.userId)) {
      return res.status(403).json({
        success: false,
        message: "You are not eligible to update this post",
      });
    }

    const updatedPost = await VolunteerPost.findByIdAndUpdate(postId, updates, {
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

const getSingleVolunteerPost = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { postId } = req.params;

    const user = await Individual.findOne({
      user: req.user._id,
    });

    if (user && !user.isVolunteer) {
      return res.status(400).json({
        success: false,
        message: "Since Volunteer mode is off,ACCESS DENIED",
      });
    }

    const post = await VolunteerPost.findById(postId);
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
  createVolunteerPost,
  deleteVolunteerPost,
  updateVolunteerPost,
  getAllVolunteerPosts,
  getSingleVolunteerPost,
};
