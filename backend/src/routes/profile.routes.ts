import { Router } from "express";
import { profileController } from "../controllers/profile.controller";
import { authenticate } from "../middlewares/authenticate";

export const profileRouter = Router();

profileRouter.get("/me", authenticate, profileController.getMe);
profileRouter.put("/me", authenticate, profileController.saveMe);
