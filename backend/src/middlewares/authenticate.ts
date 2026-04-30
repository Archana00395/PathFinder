import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/appError";
import { verifyToken } from "../utils/jwt";

declare global {
  namespace Express {
    interface Request {
      authUserId?: string;
    }
  }
}

export const authenticate = (request: Request, _response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return next(new AppError("Authorization token is required.", 401));
  }

  const token = authHeader.replace("Bearer ", "").trim();

  try {
    const payload = verifyToken(token);
    request.authUserId = String(payload.sub);
    return next();
  } catch {
    return next(new AppError("Invalid or expired token.", 401));
  }
};
