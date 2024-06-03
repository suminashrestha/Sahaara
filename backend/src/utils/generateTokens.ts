import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface User {
  _id: string;
  username: string;
  email: string;
  type: string;
  isVerified: boolean;
}

const generateAccessToken = (user: User): string => {
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

const generateRefreshToken = (user: User): string => {
  const payload = {
    _id: user._id,
  };

  return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET as string, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

const generateAccessAndRefreshTokens = (
  user: User
): { accessToken: string; refreshToken: string } => {
  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { accessToken, refreshToken };
};

export {
  generateAccessToken,
  generateRefreshToken,
  generateAccessAndRefreshTokens,
};
