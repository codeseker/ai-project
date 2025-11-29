import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { errorResponse, successResponse } from "../utils/api";
import User from "../models/user";
import { generateToken } from "../utils/jwt";
import { hashPassword } from "../utils/bcrypt";
import Role from "../models/role";
import { UserStatus } from "../constants/enums/user";

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, firstName, lastName } = req.body;

  const encryptedPassword = await hashPassword(password);

  const role = await Role.findOne({name: "regular_user"});
  if(!role) {
    return errorResponse(res, {
      statusCode: 500,
      message: "User role not found. Please contact support.",
    });
  }

  const createdUser = new User({
    username,
    email,
    password: encryptedPassword,
    first_name: firstName,
    last_name: lastName,
    status: UserStatus.PENDING,
    role: role._id,
  });

  const accessToken = generateToken(
    { id: createdUser._id, email: email },
    "2h"
  );

  const refreshToken = generateToken({ id: createdUser._id }, "7d");

  createdUser.refreshToken = refreshToken;
  await createdUser.save();

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true, // set true only in production
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return successResponse(res, {
    statusCode: 201,
    message: "User registered successfully.",
    data: { user: createdUser.toJSON(), token: accessToken },
  });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return errorResponse(res, {
      statusCode: 404,
      message: "User not found",
      errors: [{ field: "email", message: "User not found" }],
    });
  }

  const accessToken = generateToken({ id: user._id, email: user.email }, "2h");

  const refreshToken = generateToken({ id: user._id }, "7d");

  await User.findByIdAndUpdate(user._id, { refreshToken });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true, // Use true in production
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  const userData = user.toJSON();

  return successResponse(res, {
    statusCode: 200,
    message: "Login successful",
    data: {
      user: userData,
      token: accessToken,
    },
  });
});


export const getProfile = asyncHandler(async (req: Request, res: Response) => {
  const user = (req as any).user;
  return successResponse(res, {
    statusCode: 200,
    message: "User profile fetched successfully",
    data: { user: user.toJSON() },
  });
});


