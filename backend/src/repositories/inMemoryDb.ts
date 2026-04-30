import {
  ChatSessionRecord,
  QuizResultRecord,
  RecommendationSnapshotRecord,
  UserRecord,
} from "../types/domain";

class InMemoryDatabase {
  users = new Map<string, UserRecord>();
  usersByEmail = new Map<string, string>();
  quizResults = new Map<string, QuizResultRecord>();
  chatSessions = new Map<string, ChatSessionRecord>();
  recommendations = new Map<string, RecommendationSnapshotRecord>();
}

export const db = new InMemoryDatabase();
