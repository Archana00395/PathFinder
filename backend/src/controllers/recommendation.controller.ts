import { NextFunction, Request, Response } from "express";
import { recommendationService } from "../services/recommendation.service";
import { AppError } from "../utils/appError";

export const recommendationController = {
  generate(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.authUserId) {
        throw new AppError("Unauthorized.", 401);
      }

      const data = recommendationService.generate(request.authUserId);
      response.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  getLatest(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.authUserId) {
        throw new AppError("Unauthorized.", 401);
      }

      const data = recommendationService.getLatest(request.authUserId);
      response.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
