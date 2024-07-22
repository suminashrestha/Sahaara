import mongoose, { Document, Schema, model } from "mongoose";

export interface IComment extends Document {
  commenter: mongoose.Schema.Types.ObjectId;
  name: string;
  comment: string;
}
export interface ILike {
  user: mongoose.Types.ObjectId;
}

export interface IRescuePost extends Document {
  rescuePostAuthor: mongoose.Types.ObjectId;
  title: string;
  description: string;
  location?: ILocation;
  rescuePostImage?: string;
  likes: ILike[];
  comments: IComment[];
}

interface ILocation extends Document {
  lng: number;
  lat: number;
}

const locationSchema: Schema<ILocation> = new Schema({
  lng: Number,
  lat: Number,
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
    comment: { type: String, required: true },
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
    location: locationSchema,
    rescuePostImage: {
      type: String,
    },
    likes: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

export const RescuePost = model<IRescuePost>("RescuePost", rescuePostSchema);
