import mongoose, { Document, Schema, model } from "mongoose";

export interface IProfile extends Document {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  location?: string;
  profilePicture?: string;
}

const profileSchema: Schema<IProfile> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    location: String,
    profilePicture: String,
  },
  {
    timestamps: true,
  }
);

export const Profile = model<IProfile>("Profile", profileSchema);
