import { PersonalityScores, QuizAnswer, QuizQuestion } from "../types/domain";
import { AppError } from "./appError";

const emptyScores = (): PersonalityScores => ({
  analytical: 0,
  creative: 0,
  social: 0,
  practical: 0,
});

export const calculateQuizScores = (
  questions: QuizQuestion[],
  answers: QuizAnswer[],
): { rawScores: PersonalityScores; normalizedScores: PersonalityScores } => {
  if (!answers.length) {
    throw new AppError("Quiz answers are required.");
  }

  const rawScores = answers.reduce<PersonalityScores>((accumulator, answer) => {
    const question = questions.find((item) => item.id === answer.questionId);
    if (!question) {
      throw new AppError(`Unknown question: ${answer.questionId}`);
    }

    const option = question.options.find((item) => item.id === answer.optionId);
    if (!option) {
      throw new AppError(`Unknown option: ${answer.optionId}`);
    }

    accumulator.analytical += option.scores.analytical;
    accumulator.creative += option.scores.creative;
    accumulator.social += option.scores.social;
    accumulator.practical += option.scores.practical;

    return accumulator;
  }, emptyScores());

  const total =
    rawScores.analytical +
    rawScores.creative +
    rawScores.social +
    rawScores.practical;

  if (!total) {
    return { rawScores, normalizedScores: emptyScores() };
  }

  const normalizedScores: PersonalityScores = {
    analytical: Math.round((rawScores.analytical / total) * 100),
    creative: Math.round((rawScores.creative / total) * 100),
    social: Math.round((rawScores.social / total) * 100),
    practical: Math.round((rawScores.practical / total) * 100),
  };

  return { rawScores, normalizedScores };
};

export const personalitySummary = (scores?: PersonalityScores) => {
  if (!scores) {
    return "The student has not completed the personality assessment yet.";
  }

  const traits = Object.entries(scores)
    .sort(([, left], [, right]) => right - left)
    .map(([trait, value]) => `${trait}: ${value}%`);

  return `Personality mix -> ${traits.join(", ")}`;
};
