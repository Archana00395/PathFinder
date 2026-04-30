import { db } from "../repositories/inMemoryDb";
import { UserProfile } from "../types/domain";
import { AppError } from "../utils/appError";

export const profileService = {
  getProfile(userId: string) {
    const user = db.users.get(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    return user.profile ?? null;
  },

  saveProfile(userId: string, profile: UserProfile) {
    const user = db.users.get(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    user.profile = {
      age: profile.age,
      educationLevel: profile.educationLevel.trim(),
      stream: profile.stream.trim(),
      interests: profile.interests.map((item) => item.trim()),
      careerIntent: profile.careerIntent,
    };
    user.updatedAt = new Date().toISOString();
    db.users.set(user.id, user);

    return user.profile;
  },
};
