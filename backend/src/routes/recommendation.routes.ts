import { Router } from "express";
import { recommendationController } from "../controllers/recommendation.controller";
import { authenticate } from "../middlewares/authenticate";

export const recommendationRouter = Router();

recommendationRouter.post("/generate", authenticate, recommendationController.generate);
recommendationRouter.get("/latest", authenticate, recommendationController.getLatest);
