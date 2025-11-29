import { z } from "zod";
import { NextFunction, type Request, type Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { errorResponse } from "../utils/api";

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(2, "First Name must be at least 2 characters"),
  lastName: z.string().min(2, "Last Name must be at least 2 characters"),
});

const registerValidation = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const {
      username,
      email,
      password,
      firstName,
      lastName,
    }: {
      username: string;
      email: string;
      password: string;
      firstName: string;
      lastName: string;
    } = req.body;

    const parseResult = registerSchema.safeParse({
      username,
      email,
      password,
      firstName,
      lastName,
    });

    if (!parseResult.success) {
      const errors = parseResult.error.issues.map((issue) => ({
        field: issue.path[0],
        message: issue.message,
      }));

      return errorResponse(res, {
        statusCode: 400,
        message: "Validation Error",
        errors,
      });
    }

    next();
  }
);

export { registerValidation };
