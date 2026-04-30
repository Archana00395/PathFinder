import { Router } from "express";
import { roadmapController } from "../controllers/roadmap.controller";

export const roadmapRouter = Router();

roadmapRouter.get("/:careerId", roadmapController.getByCareerId);
