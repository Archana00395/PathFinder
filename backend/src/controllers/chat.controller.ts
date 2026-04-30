import { NextFunction, Request, Response } from "express";
import { chatService } from "../services/chat.service";
import { AppError } from "../utils/appError";

export const chatController = {
  createSession(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.authUserId) {
        throw new AppError("Unauthorized.", 401);
      }

      const data = chatService.createSession(request.authUserId);
      response.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  getCurrent(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.authUserId) {
        throw new AppError("Unauthorized.", 401);
      }

      const data = chatService.getCurrentSession(request.authUserId);
      response.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },

  async addMessage(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.authUserId) {
        throw new AppError("Unauthorized.", 401);
      }

      if (typeof request.body.message !== "string" || !request.body.message.trim()) {
        throw new AppError("Message is required.");
      }

      const data = await chatService.addMessage(request.authUserId, request.body.message);
      response.status(201).json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
