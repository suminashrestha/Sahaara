import { CookieOptions, Request, Response } from "express";
import { User, UserType } from "../models/user.model";
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
import { resourceLimits } from "worker_threads";

const signUpHandler = async (
  req: Request,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  try {
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

    const verifyCode = Math.floor(1000 + Math.random() * 900000).toString();
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

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
        type,
        verifyCode,
        isVerified: false,
        verifyCodeExpiry: verifyCodeExpiry,
      });

      await sendVerificationCode(email, verifyCode);

      return res.status(201).json({
        success: true,
        message: "User successfully created. Verification code sent.",
        data: newUser,
      });
    }
  } catch (error: any) {
    console.error("Error during signup:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

const signInHandler = async (
  req: Request,
  res: Response<ApiResponse>
): Promise<Response<ApiResponse>> => {
  try {
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

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken -verifyCode -verifyCodeExpiry"
    );

    const refreshToken = await generateRefreshToken(
      loggedInUser as TokenPropsUser
    );
    const accessToken = await generateAccessToken(
      loggedInUser as TokenPropsUser
    );

    const options: CookieOptions = {
      httpOnly: true,
      secure: true,
    };

    res.cookie("refreshToken", refreshToken, options);
    res.cookie("accessToken", accessToken, options);

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: { user: loggedInUser, refreshToken, accessToken },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const codeVerifier = async (req: Request, res: Response<ApiResponse>) => {
  try {
    const { username, verifyCode } = req.body;

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
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export { signUpHandler, signInHandler, codeVerifier };
