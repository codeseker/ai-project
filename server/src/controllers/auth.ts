import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { errorResponse, successResponse } from "../utils/api";
import User from "../models/user";


const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, firstName, lastName } = req.body;



  return successResponse(res, {
    statusCode: 201,
    message: "User registered successfully.",
    data: {
      userId: "newly-generated-user-id",
      username,
      email,
    },
  });
});

export { register };
