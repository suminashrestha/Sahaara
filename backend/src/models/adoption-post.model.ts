import mongoose, { Document, Schema, model } from "mongoose";

export interface IAdoptionPost extends Document {
  adoptionPostAuthor: mongoose.Schema.Types.ObjectId;
  isAdopted?: boolean;
  name: string;
  breed: string;
  age: string;
  gender: string;
  size: string;
  color?: string;
  coatLength?: string;
  characterstics?: string[];
  health?: string[];
  contact?: {
    name: string;
    address: string;
    phone: string;
    email: string;
  };
  myStory?: string;
  category?: string;
  adoptionPostImage?: string;
}

const ContactSchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
});

const adoptionPostSchema: Schema<IAdoptionPost> = new Schema(
  {
    adoptionPostAuthor: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    coatLength: { type: String, required: true },
    characterstics: [{ type: String, required: true }],
    health: [{ type: String, required: true }],
    contact: { type: ContactSchema, required: true },
    myStory: { type: String, required: true },
    category: { type: String },
    isAdopted: { type: Boolean, default: false, required: true },
    adoptionPostImage: { type: String },
  },
  { timestamps: true }
);
export const AdoptionPost = model<IAdoptionPost>(
  "AdoptionPost",
  adoptionPostSchema
);
