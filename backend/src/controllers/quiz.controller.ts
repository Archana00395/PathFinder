import { NextFunction, Request, Response } from "express";
import { quizService } from "../services/quiz.service";
import { AppError } from "../utils/appError";

export const quizController = {
  getQuestions(_request: Request, response: Response) {
    response.json({
      success: true,
      data: quizService.getQuestions(),
    });
  },

  submit(request: Request, response: Response, next: NextFunction) {
    try {
      if (!request.authUserId) {
        throw new AppError("Unauthorized.", 401);
      }

      const answers = request.body.answers;
      if (!Array.isArray(answers)) {
        throw new AppError("Answers must be an array.");
      }

      const data = quizService.submit(request.authUserId, answers);
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

      const data = quizService.getLatest(request.authUserId);
      response.json({ success: true, data });
    } catch (error) {
      next(error);
    }
  },
};
