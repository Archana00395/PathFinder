import { NextFunction, Request, Response } from "express";
import { roadmapService } from "../services/roadmap.service";

export const roadmapController = {
  getByCareerId(
    request: Request<{ careerId: string }>,
    response: Response,
    next: NextFunction,
  ) {
    try {
      const data = roadmapService.getCareerRoadmap(request.params.careerId);
      response.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
