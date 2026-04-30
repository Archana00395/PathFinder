import { db } from "../repositories/inMemoryDb";
import { AppError } from "../utils/appError";

export const dashboardService = {
  getOverview(userId: string) {
    const user = db.users.get(userId);
    if (!user) {
      throw new AppError("User not found.", 404);
    }

    const latestRecommendations = user.latestRecommendationSnapshotId
      ? db.recommendations.get(user.latestRecommendationSnapshotId)
      : null;
    const currentChat = user.currentChatSessionId ? db.chatSessions.get(user.currentChatSessionId) : null;

    const completedSteps = [
      Boolean(user.profile),
      Boolean(user.personalityScores),
      Boolean(currentChat?.messages.length),
      Boolean(latestRecommendations),
    ].filter(Boolean).length;

    const badges = [
      user.profile ? "Profile Starter" : null,
      user.personalityScores ? "Self Discovery" : null,
      currentChat?.messages.length ? "Conversation Builder" : null,
      latestRecommendations ? "Career Pathfinder" : null,
    ].filter(Boolean);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      profile: user.profile ?? null,
      personalityScores: user.personalityScores ?? null,
      progress: {
        completedSteps,
        totalSteps: 4,
        percentage: Math.round((completedSteps / 4) * 100),
      },
      badges,
      latestRecommendations: latestRecommendations?.recommendations ?? [],
      currentChat: currentChat
        ? {
            id: currentChat.id,
            messageCount: currentChat.messages.length,
            readyForRecommendations: currentChat.readyForRecommendations,
          }
        : null,
    };
  },
};
