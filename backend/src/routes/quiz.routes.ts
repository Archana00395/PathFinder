import { Router } from "express";
import { quizController } from "../controllers/quiz.controller";
import { authenticate } from "../middlewares/authenticate";

export const quizRouter = Router();

quizRouter.get("/questions", quizController.getQuestions);
quizRouter.post("/submit", authenticate, quizController.submit);
quizRouter.get("/result", authenticate, quizController.getLatest);
