import mongoose, { Document, Schema, model } from "mongoose";

export interface IAdoptionPost extends Document {
  adoptionPostAuthor: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  location?: string;
  adoptionPostImage?: string;
  adoptersList?: IAdopter[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IAdopter extends Document {
  adoptionPostId: mongoose.Schema.Types.ObjectId;
  adoptor: mongoose.Schema.Types.ObjectId;
}

const adopterSchema: Schema<IAdopter> = new Schema(
  {
    adoptionPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdoptionPost",
    },
    adoptor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const adoptionPostSchema: Schema<IAdoptionPost> = new Schema(
  {
    adoptionPostAuthor: {
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
    adoptionPostImage: {
      type: String,
      required: true,
    },
    adoptersList: [adopterSchema],
  },
  {
    timestamps: true,
  }
);

export const AdoptionPost = model<IAdoptionPost>(
  "AdoptionPost",
  adoptionPostSchema
);

export const Adopter = model<IAdopter>("Adopter", adopterSchema);
