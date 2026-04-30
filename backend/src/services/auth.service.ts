import bcrypt from "bcryptjs";
import { db } from "../repositories/inMemoryDb";
import { UserRecord } from "../types/domain";
import { AppError } from "../utils/appError";
import { createId } from "../utils/id";
import { signToken } from "../utils/jwt";

const sanitizeUser = (user: UserRecord) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  profile: user.profile,
  personalityScores: user.personalityScores,
  quizCompletedAt: user.quizCompletedAt,
  currentChatSessionId: user.currentChatSessionId,
  latestRecommendationSnapshotId: user.latestRecommendationSnapshotId,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

export const authService = {
  async signup(name: string, email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    if (db.usersByEmail.has(normalizedEmail)) {
      throw new AppError("An account with this email already exists.", 409);
    }

    const now = new Date().toISOString();
    const user: UserRecord = {
      id: createId(),
      name: name.trim(),
      email: normalizedEmail,
      passwordHash: await bcrypt.hash(password, 10),
      createdAt: now,
      updatedAt: now,
    };

    db.users.set(user.id, user);
    db.usersByEmail.set(user.email, user.id);

    return {
      token: signToken(user.id),
      user: sanitizeUser(user),
    };
  },

  async login(email: string, password: string) {
    const normalizedEmail = email.trim().toLowerCase();
    const userId = db.usersByEmail.get(normalizedEmail);
    if (!userId) {
      throw new AppError("Invalid email or password.", 401);
    }

    const user = db.users.get(userId);
    if (!user) {
      throw new AppError("User record is missing.", 404);
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      throw new AppError("Invalid email or password.", 401);
    }

    return {
      token: signToken(user.id),
      user: sanitizeUser(user),
    };
  },

  getMe(userId: string) {
    const user = db.users.get(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return sanitizeUser(user);
  },
};
