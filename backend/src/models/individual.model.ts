import mongoose, { Document, Schema, model } from "mongoose";

export interface IIndividual extends Document {
  user: mongoose.Schema.Types.ObjectId;
  name: string;
  location: string;
  isVolunteer: boolean;
  profilePicture?: string;
}

const individualSchema: Schema<IIndividual> = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    profilePicture: String,
    isVolunteer: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Individual = model("Individual", individualSchema);
