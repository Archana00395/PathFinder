import { roadmaps } from "../constants/careerCatalog";
import { AppError } from "../utils/appError";

export const roadmapService = {
  getCareerRoadmap(careerId: string) {
    const roadmap = roadmaps[careerId];
    if (!roadmap) {
      throw new AppError("Roadmap not found for that career.", 404);
    }

    return roadmap;
  },
};
