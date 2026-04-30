import { NextFunction, Request, Response } from "express";
import { authService } from "../services/auth.service";
import { AppError } from "../utils/appError";

const requireString = (value: unknown, field: string) => {
  if (typeof value !== "string" || !value.trim()) {
    throw new AppError(`${field} is required.`);
  }

  return value.trim();
};

export const authController = {
  async signup(request: Request, response: Response, next: NextFunction) {
    try {
      const name = requireString(request.body.name, "Name");
      const email = requireString(request.body.email, "Email");
      const password = requireString(request.body.password, "Password");

      const data = await authService.signup(name, email, password);
      response.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const email = requireString(request.body.email, "Email");
      const password = requireString(request.body.password, "Password");

      const data = await authService.login(email, password);
      response.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  me(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.authUserId) {
        throw new AppError("Unauthorized.", 401);
      }

      const data = authService.getMe(request.authUserId);
      response.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
