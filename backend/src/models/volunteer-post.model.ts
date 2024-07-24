import mongoose, { model } from "mongoose";

interface IVolunteerPost extends mongoose.Document {
  userId: mongoose.Schema.Types.ObjectId; //only org
  title: string;
  description: string;
}

const volunteerPostSchema: mongoose.Schema<IVolunteerPost> =
  new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  });

export const VolunteerPost = model<IVolunteerPost>(
  "VolunteerPost",
  volunteerPostSchema
);
