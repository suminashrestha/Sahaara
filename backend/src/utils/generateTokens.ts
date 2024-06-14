import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.model";

dotenv.config();

export interface TokenPropsUser {
  _id: string;
  username: string;
  email: string;
  type: string;
  isVerified: boolean;
}

const generateAccessToken = (user: TokenPropsUser): string => {
  const payload = {
    _id: user._id,
    username: user.username,
    email: user.email,
    type: user.type,
    isVerified: user.isVerified,
  };

  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as string, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
  });
};

const generateRefreshToken = (user: TokenPropsUser): string => {
  const payload = {
    _id: user._id,
  };

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

const generateAccessAndRefreshTokens = async (
  user: TokenPropsUser
): Promise<{ accessToken: string; refreshToken: string }> => {
  const userFound = await User.findById({ _id: user._id });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { accessToken, refreshToken };
};

export {
  generateAccessToken,
  generateRefreshToken,
  // generateAccessAndRefreshTokens,
};
