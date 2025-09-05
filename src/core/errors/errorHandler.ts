// core/errors/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";
import { ApiResponse } from "../responses/ApiResponse";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json(ApiResponse.error(err.message, err.details));
  }

  console.error("Unexpected Error:", err);
  return res
    .status(500)
    .json(ApiResponse.error("Something went wrong", err.message));
};
