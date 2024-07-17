import mongoose, { Document, Schema, model } from "mongoose";

export interface IComment extends Document {
  commenter: mongoose.Schema.Types.ObjectId;
  name: string;
  content: string;
}
export interface ILike extends Document {
  user: mongoose.Schema.Types.ObjectId;
}

export interface IRescuePost extends Document {
  rescuePostAuthor: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  location?: string;
  rescuePostImage?: string;
  likes: ILike[];
  comments: IComment[];
}

const likeSchema: Schema<ILike> = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const commentSchema: Schema<IComment> = new Schema(
  {
    name: {
      type: String,
    },
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
    },
    likes: [likeSchema],

    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

export const RescuePost = model<IRescuePost>("RescuePost", rescuePostSchema);
