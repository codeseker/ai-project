import { Request, Response } from "express";
import { asyncHandler } from "../utils/async-handler";
import { successResponse } from "../utils/api";

export const create = asyncHandler(async (req: Request, res:Response) => {
    return successResponse(res, {
        statusCode: 200,
        message: "Create course endpoint",
        data: null,
    })
});