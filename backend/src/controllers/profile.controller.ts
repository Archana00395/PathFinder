import { NextFunction, Request, Response } from "express";
import { profileService } from "../services/profile.service";
import { AppError } from "../utils/appError";

export const profileController = {
  getMe(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.authUserId) {
        throw new AppError("Unauthorized.", 401);
      }

      const data = profileService.getProfile(request.authUserId);
      response.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  saveMe(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.authUserId) {
        throw new AppError("Unauthorized.", 401);
      }

      const { age, educationLevel, stream, interests, careerIntent } = request.body;

      if (typeof age !== "number" || age <= 0) {
        throw new AppError("Age must be a valid number.");
      }

      if (typeof educationLevel !== "string" || !educationLevel.trim()) {
        throw new AppError("Education level is required.");
      }

      if (typeof stream !== "string" || !stream.trim()) {
        throw new AppError("Stream is required.");
      }

      if (!Array.isArray(interests) || !interests.length) {
        throw new AppError("At least one interest is required.");
      }

      if (!["confused", "exploring", "switching"].includes(careerIntent)) {
        throw new AppError("Career intent is invalid.");
      }

      const data = profileService.saveProfile(request.authUserId, {
        age,
        educationLevel,
        stream,
        interests,
        careerIntent,
      });

      response.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
