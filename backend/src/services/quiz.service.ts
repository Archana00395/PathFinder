import { quizQuestions } from "../constants/quizQuestions";
import { db } from "../repositories/inMemoryDb";
import { QuizAnswer, QuizResultRecord } from "../types/domain";
import { AppError } from "../utils/appError";
import { createId } from "../utils/id";
import { calculateQuizScores } from "../utils/personality";

export const quizService = {
  getQuestions() {
    return quizQuestions;
  },

  submit(userId: string, answers: QuizAnswer[]) {
    const user = db.users.get(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    if (!user.profile) {
      throw new AppError("Complete onboarding before submitting the quiz.", 400);
    }

    if (answers.length !== quizQuestions.length) {
      throw new AppError(`Expected ${quizQuestions.length} quiz answers.`, 400);
    }

    const { rawScores, normalizedScores } = calculateQuizScores(quizQuestions, answers);
    const completedAt = new Date().toISOString();

    const result: QuizResultRecord = {
      id: createId(),
      userId,
      answers,
      rawScores,
      normalizedScores,
      completedAt,
    };

    user.personalityScores = normalizedScores;
    user.quizCompletedAt = completedAt;
    user.updatedAt = completedAt;

    db.users.set(user.id, user);
    db.quizResults.set(userId, result);

    return result;
  },

  getLatest(userId: string) {
    return db.quizResults.get(userId) ?? null;
  },
};
