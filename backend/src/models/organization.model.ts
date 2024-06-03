import mongoose, { Document, Schema, model } from "mongoose";

export interface IOrganization extends Document {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  location: string;
  profilePicture?: string;
}

const organizationSchema: Schema<IOrganization> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    location: String,
    profilePicture: String,
  },
  {
    timestamps: true,
  }
);

export const Organization = model("Organization", organizationSchema);
