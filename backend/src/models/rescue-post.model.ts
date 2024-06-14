import mongoose, { Document, Schema, model } from "mongoose";

interface IComment extends Document {
  commenter: mongoose.Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IRescuePost extends Document {
  rescuePostAuthor: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  location?: string;
  rescuePostImage?: string;
  likes: mongoose.Schema.Types.ObjectId[];
  comments: IComment[];
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema: Schema<IComment> = new Schema(
  {
    commenter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: String,
  },
  {
    timestamps: true,
  }
);

const rescuePostSchema: Schema<IRescuePost> = new Schema(
  {
    rescuePostAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: String,
    rescuePostImage: {
      type: String,
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

export const RescuePost = model<IRescuePost>("RescuePost", rescuePostSchema);
