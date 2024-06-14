import { Document, Schema, model } from "mongoose";
import { AdoptionPost } from "./adoption-post.model";

export enum UserType {
  Individual = "individual",
  Organization = "organization",
  Admin = "admin",
}

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  type: UserType;
  verifyCode: string;
  isVerified: boolean;
  verifyCodeExpiry: Date;
  refreshToken?: string;
}

const userSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    type: {
      type: String,
      enum: UserType,
      required: [true, "type is required"],
    },
    refreshToken: String,
    verifyCode: String,
    verifyCodeExpiry: Date,
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

(userSchema as any).pre("remove", async function (next: (err?: Error) => void) {
  try {
    await AdoptionPost.deleteMany({ author: this._id });
    next();
  } catch (err: any) {
    next(err);
  }
});

export const User = model<IUser>("User", userSchema);
