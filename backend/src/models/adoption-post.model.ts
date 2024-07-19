import mongoose, { Document, Schema, model } from "mongoose";

export interface IAdoptionPost extends Document {
  adoptionPostAuthor: mongoose.Schema.Types.ObjectId;
  title: string;
  description: string;
  location?: string;
  category?: string;
  isAdopted: boolean;
  adoptionPostImage?: string;
  adoptersList?: IAdopter[];
}

export interface IAdopter extends Document {
  adoptionPostId: mongoose.Schema.Types.ObjectId;
  adopter: mongoose.Schema.Types.ObjectId;
}

const adopterSchema: Schema<IAdopter> = new Schema(
  {
    adoptionPostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdoptionPost",
    },
    adopter: {
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
    isAdopted: {
      type: Boolean,
      default: false,
    },
    location: String,
    category: String,
    adoptionPostImage: {
      type: String,
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
