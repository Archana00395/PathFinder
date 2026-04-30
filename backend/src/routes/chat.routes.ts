import { Router } from "express";
import { chatController } from "../controllers/chat.controller";
import { authenticate } from "../middlewares/authenticate";

export const chatRouter = Router();

chatRouter.post("/session", authenticate, chatController.createSession);
chatRouter.get("/session/current", authenticate, chatController.getCurrent);
chatRouter.post("/session/current/messages", authenticate, chatController.addMessage);
