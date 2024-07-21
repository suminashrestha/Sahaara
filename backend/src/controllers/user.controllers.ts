import { CookieOptions, Request, Response } from "express";
import { IUser, User, UserType } from "../models/user.model";
import bcrypt from "bcryptjs";
import { sendVerificationCode } from "../utils/sendVerificationCode";
import { ApiResponse } from "../types/apiResponse";
import { signupSchema } from "../validators/signup.validators";
import { signinSchema } from "../validators/signin.validators";
import {
  TokenPropsUser,
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateTokens";
import { verifySchema } from "../validators/verify-code.validators";
import asyncHandler from "../utils/asyncHandler";
import { sendResetCode } from "../utils/sendResetCode";
import { AuthRequest } from "./adoption-post.controllers";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const options: CookieOptions = {
  httpOnly: true,
  secure: true,
};

const signUpHandler = asyncHandler(
  async (
    req: Request,
    res: Response<ApiResponse>
  ): Promise<Response<ApiResponse>> => {
    const { username, email, password, type } = req.body;

    const validationResult = signupSchema.safeParse({
      username,
      email,
      password,
      type,
    });

    if (!validationResult.success) {
      const errors = validationResult.error.errors.map(
        (error) => error.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation error",
        errors: errors,
      });
    }

    if (!username || !email || !password || !type) {
      return res.status(400).json({
        success: false,
        message: "Some field is missing here",
      });
    }

    if (!Object.values(UserType).includes(type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user type",
      });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    if (existingUser) {
      if (existingUser.isVerified) {
        return res.status(409).json({
          success: false,
          message: "User already exists",
        });
      } else {
        existingUser.username = username;
        existingUser.email = email;
        existingUser.password = hashedPassword;
        existingUser.verifyCode = verifyCode;
        existingUser.verifyCodeExpiry = new Date(Date.now() + 3600000);

        await existingUser.save();

        await sendVerificationCode(email, verifyCode);

        return res.status(200).json({
          success: true,
          message: "User updated successfully. Verification code sent.",
        });
      }
    } else {
      const verifyCodeExpiry = new Date(Date.now() + 3600000);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        type,
        verifyCode,
        isVerified: false,
        verifyCodeExpiry,
      });

      if (type === UserType.Individual) {
        newUser.isVolunteer = false;
      }

      await newUser.save();

      await sendVerificationCode(email, verifyCode);

      return res.status(201).json({
        success: true,
        message: "User successfully created. Verification code sent.",
        data: newUser,
      });
    }
  }
);

const signInHandler = asyncHandler(
  async (
    req: Request,
    res: Response<ApiResponse>
  ): Promise<Response<ApiResponse>> => {
    const { identifier, password } = req.body;

    const signInValidationResult = signinSchema.safeParse({
      identifier,
      password,
    });

    if (!signInValidationResult.success) {
      const errors = signInValidationResult.error.errors.map(
        (error) => error.message
      );
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: errors,
      });
    }

    const { data } = signInValidationResult;

    const user = await User.findOne({
      $or: [{ email: data.identifier }, { username: data.identifier }],
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Account not verified. Please verify your account.",
      });
    }

    const refreshToken = await generateRefreshToken(user as TokenPropsUser);
    const accessToken = await generateAccessToken(user as TokenPropsUser);

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    res.cookie("refreshToken", refreshToken, options);
    res.cookie("accessToken", accessToken, options);

    let loggedInUser;
    if (user.type === UserType.Individual) {
      loggedInUser = {
        _id: user._id,
        username: user.username,
        email: user.email,
        type: user.type,
        isVolunteer: user.isVolunteer,
      };
    } else {
      loggedInUser = {
        _id: user._id,
        username: user.username,
        email: user.email,
        type: user.type,
      };
    }

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { user: loggedInUser, refreshToken, accessToken },
    });
  }
);

const codeVerifier = asyncHandler(
  async (req: Request, res: Response<ApiResponse>) => {
    const { username, verifyCode } = req.body;

    const verifyCodeValidation = verifySchema.safeParse({ code: verifyCode });

    if (!verifyCodeValidation.success) {
      return res.status(400).json({
        success: false,
        message: verifyCodeValidation.error.errors[0].message,
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User with this username does not exist",
      });
    }

    const isVerifyCodeCorrect = user.verifyCode === verifyCode;
    const isVerifyCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isVerifyCodeCorrect && isVerifyCodeNotExpired) {
      user.isVerified = true;

      await user.save();
      return res.status(200).json({
        success: true,
        message: "User verified successfully",
      });
    } else if (!isVerifyCodeCorrect) {
      return res.status(400).json({
        success: false,
        message: "Incorrect Verification Code, Please try again",
      });
    } else if (!isVerifyCodeNotExpired) {
      return res.status(400).json({
        success: false,
        message: "Verification Code Expired, Please Login again",
      });
    }
  }
);

const getVerificationCode = asyncHandler(
  async (req: Request, res: Response) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email, isVerified: true });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Found",
      });
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

    user.verifyCode = verifyCode;
    user.verifyCodeExpiry = new Date(Date.now() + 3600000);

    await user.save();

    await sendResetCode(email, verifyCode);

    res.status(200).json({
      success: true,
      message: "Verification code has been sent to your email.",
    });
  }
);

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { username, verifyCode, newPassword } = req.body;
  if (!username || !verifyCode || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }

  const user = await User.findOne({
    username,
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User with this username cannot be found",
    });
  }

  const isVerifyCodeCorrect = user.verifyCode === verifyCode;
  const isVerifyCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

  if (isVerifyCodeCorrect && isVerifyCodeNotExpired) {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "User's password successfully changed",
    });
  } else if (!isVerifyCodeCorrect) {
    return res.status(400).json({
      success: false,
      message: "Incorrect Verification Code, Please try again",
    });
  } else if (!isVerifyCodeNotExpired) {
    return res.status(400).json({
      success: false,
      message: "Verification Code Expired, Please Login again",
    });
  }
});

const logoutUser = asyncHandler(async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.refreshToken = undefined;
    await user.save({ validateBeforeSave: false });
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json({ success: true, message: "User logged out successfully" });
});

const refreshAccessToken = asyncHandler(async (req: Request, res: Response) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "No Token Available",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string
    ) as jwt.JwtPayload & { _id: string };
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid Token",
      });
    }

    if (token !== user.refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Token has Expired",
      });
    }

    const newRefreshToken = await generateRefreshToken(user as TokenPropsUser);
    const accessToken = await generateAccessToken(user as TokenPropsUser);

    user.refreshToken = newRefreshToken;
    await user.save({ validateBeforeSave: false });

    res.cookie("refreshToken", newRefreshToken, options);
    res.cookie("accessToken", accessToken, options);

    const loggedInUser = {
      _id: user._id,
      username: user.username,
      email: user.email,
      type: user.type,
      isVerified: user.isVerified,
    };

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: {
        user: loggedInUser,
        refreshToken: newRefreshToken,
        accessToken,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

const toggleVolunteerMode = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { isVolunteer } = req.body;

    if (typeof isVolunteer !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Invalid input for volunteer mode",
      });
    }

    const user = await User.findOne({ user: req.user._id });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Couldn't update the Volunteer mode",
      });
    }

    user.isVolunteer = isVolunteer;
    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  }
);

export {
  signUpHandler,
  signInHandler,
  codeVerifier,
  getVerificationCode,
  resetPassword,
  logoutUser,
  refreshAccessToken,
  toggleVolunteerMode,
};
