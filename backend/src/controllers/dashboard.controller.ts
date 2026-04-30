import { NextFunction, Request, Response } from "express";
import { dashboardService } from "../services/dashboard.service";
import { AppError } from "../utils/appError";

export const dashboardController = {
  overview(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.authUserId) {
        throw new AppError("Unauthorized.", 401);
      }

      const data = dashboardService.getOverview(request.authUserId);
      response.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
